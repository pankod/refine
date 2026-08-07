import { useNavigate } from "react-router";
import styled from "styled-components";
import { Button, Separator, TextInput } from "react95";
import { type CSSProperties, useState } from "react";
import { useForm } from "@refinedev/react-hook-form";
import { useNavigation } from "@refinedev/core";
import { Controller, type FieldValues } from "react-hook-form";
import { VideoClubLayoutSubPage } from "@/components/layout";
import { ArrowGreenPixelatedIcon } from "@/components/icons";
import { ImagePixelated } from "@/components/image-pixelated";
import { supabaseClient } from "@/supabase-client";
import type { Member } from "@/types";

export const VideoClubMemberPageEdit = () => {
  const [memberPhoto, setMemberPhoto] = useState<string | null>(null);

  const navigate = useNavigate();
  const { show } = useNavigation();

  const {
    control,
    refineCore: { onFinish, query: queryResult },
    handleSubmit,
  } = useForm<Member>();

  const onFinishHandler = (data: FieldValues) => {
    onFinish({
      ...data,
      photo_url: memberPhoto || queryResult?.data?.data?.photo_url,
    });
  };

  const member = queryResult?.data?.data;
  const isLoading = queryResult?.isLoading;

  return (
    <VideoClubLayoutSubPage
      title="Edit Member"
      help="You can  edit the member in the Refine Video Club."
      onClose={() => navigate("/video-club")}
      isLoading={isLoading}
    >
      <Container>
        <AddPhotoContainer>
          <MemberPhoto src={memberPhoto || member?.photo_url} alt="member" />
          <AddPhotoButton type="photo">
            Change Photo
            <AddPhotoInput
              type="file"
              id="memberPhoto"
              name="memberPhoto"
              accept="image/png, image/jpeg, image/jpg"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const result = await supabaseClient.storage
                    .from("refine-video-club")
                    .upload(`member-${new Date().getTime()}`, file, {
                      cacheControl: "3600",
                      upsert: true,
                    });

                  if (result.data?.path) {
                    setMemberPhoto(
                      `https://zqkwxnnygrsquzhpcckc.supabase.co/storage/v1/object/public/refine-video-club/${result.data.path}`,
                    );
                  }
                }
              }}
            />
          </AddPhotoButton>
        </AddPhotoContainer>

        <Form id="create-member-form" onSubmit={handleSubmit(onFinishHandler)}>
          <InputRow>
            <InputLabel htmlFor="first_name">First Name*:</InputLabel>
            <Controller
              name="first_name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </InputRow>

          <InputRow>
            <InputLabel htmlFor="last_name">Last Name*:</InputLabel>
            <Controller
              name="last_name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </InputRow>

          <InputRow>
            <InputLabel htmlFor="phone">Phone*:</InputLabel>
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <Input {...field} />}
            />
          </InputRow>

          <InputRow $alignItems="flex-start">
            <InputLabel htmlFor="address">Address*:</InputLabel>
            <Controller
              name="address"
              control={control}
              rules={{ required: true }}
              render={({ field }) => <InputTextArea {...field} />}
            />
          </InputRow>
        </Form>
      </Container>
      <Separator />
      <ActionContainer>
        <AddMemberButton type="submit" form="create-member-form">
          <ArrowGreenPixelatedIcon />
          <span>Save Changes</span>
        </AddMemberButton>
        <ActionButton
          type="button"
          onClick={() => {
            if (!member) return;
            show("members", member?.id);
          }}
        >
          Cancel
        </ActionButton>
      </ActionContainer>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  display: flex;
  gap: 40px;
  padding: 24px;
`;

const AddPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const AddPhotoButton = styled(Button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 32px;
  z-index: 1;
`;
const AddPhotoInput = styled.input`
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
`;

const MemberPhoto = styled(ImagePixelated)`
  min-width: 200px;
  min-height: 200px;
  max-width: 200px;
  max-height: 200px;
  aspect-ratio: 200 / 200;
  object-fit: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 408px;
  gap: 24px;
`;

const InputRow = styled.div<{
  $alignItems?: CSSProperties["alignItems"];
}>`
  display: flex;
  align-items: ${({ $alignItems }) => $alignItems || "center"};
`;

const InputLabel = styled.label`
  width: 104px;
`;

const Input = styled(TextInput)`
  width: 240px;
`;

const InputTextArea = styled(TextInput)`
  width: 290px;
`;

const DepositText = styled.div`
  font-weight: bold;
`;

const ActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px;
`;

const ActionButton = styled(Button)`
  width: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const AddMemberButton = styled(ActionButton)`
  width: 172px;
  font-weight: bold;
`;

import styled from "styled-components";
import { useNavigate } from "react-router";
import { VideoClubLayoutSubPage } from "../../../components/layout/video-club/subpage-layout";
import { NumberInput, TextInput } from "react95";
import {
  DEPOSIT,
  MAXIMUM_TAPE_ALLOWED_TO_RENT,
  NIGHTLY_LATE_RETURN_PENALTY,
  NIGHTLY_RENTAL_FEE,
} from "../../../utils/app-settings";

export const VideoClubSettingsPage = () => {
  const navigate = useNavigate();

  return (
    <VideoClubLayoutSubPage
      title="Settings"
      help="You can change the settings of the Refine Video Club."
      onClose={() => navigate("/video-club")}
    >
      <Container>
        <Form>
          <FormRow>
            <FormLabel>Membership Deposit Fee:</FormLabel>
            $
            <FormTextInput disabled defaultValue={DEPOSIT} />
          </FormRow>

          <FormRow>
            <FormLabel>Nightly rental Fee per Tape:</FormLabel>
            $
            <FormTextInput disabled defaultValue={NIGHTLY_RENTAL_FEE} />
          </FormRow>

          <FormRow>
            <FormLabel>Nightly Late Return Penalty per Tape:</FormLabel>
            $
            <FormTextInput
              disabled
              defaultValue={NIGHTLY_LATE_RETURN_PENALTY}
            />
          </FormRow>

          <FormRow>
            <FormLabel>Maximum tapes allowed at one time:</FormLabel>
            <FormNumberInput
              disabled
              defaultValue={MAXIMUM_TAPE_ALLOWED_TO_RENT}
            />
          </FormRow>
        </Form>
      </Container>
    </VideoClubLayoutSubPage>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 460px;
  padding: 20px;
`;

const Form = styled.form`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
`;

const FormLabel = styled.label`
  width: 300px;
  font-weight: bold;
  text-align: right;
  margin-right: 24px;
`;

const FormTextInput = styled(TextInput)`
  width: 84px;
  margin-left: 4px;
`;

const FormNumberInput = styled(NumberInput)`
  width: 84px !important;
`;

<script lang="ts">
// @ts-nocheck
import Dialog, { Title, Content, Actions } from "@smui/dialog";
import Textfield from "@smui/textfield";
import HelperText from "@smui/textfield/helper-text";
import CharacterCounter from "@smui/textfield/character-counter";
import Card from "@smui/card";
import Button from "@smui/button";

const title = "";
const content = "";

export let open = false;

async function createPost() {
  const res = await fetch("https://api.fake-rest.refine.dev/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
      createdAt: Date.now(),
    }),
  }).then((res) => {
    res.json();
    open = false;
  });
}
</script>

<Dialog bind:open selection aria-labelledby="list-title" aria-describedby="list-content">
	<Title id="list-title">Create New Post</Title>
	<Content id="mandatory-content">
		<Card padded>
			<Textfield variant="outlined" bind:value={title} label="Title">
				<HelperText slot="Title">Helper Text</HelperText>
			</Textfield>
			<br />
			<Textfield textarea input$maxlength={2500} bind:value={content} label="Content">
				<CharacterCounter slot="internalCounter">0 / 100</CharacterCounter>
			</Textfield>
			<br />
			<Button on:click={createPost}>Create</Button>
		</Card>
	</Content>
	<Actions>
		<Button action="accept">Close</Button>
	</Actions>
</Dialog>

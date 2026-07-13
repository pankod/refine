<script>
import Button from "@smui/button";
/** @type {import('./$types').PageData} */
export let data;
import Textfield from "@smui/textfield";
import HelperText from "@smui/textfield/helper-text";
import Card, { Content } from "@smui/card";
import CharacterCounter from "@smui/textfield/character-counter";
import { goto } from "$app/navigation";
const valueA = data.title;
const value = data.content;

async function editPost() {
  const res = await fetch(`https://api.fake-rest.refine.dev/posts/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: valueA,
      content: value,
    }),
  }).then((res) => {
    res.json();

    goto("/");
  });
}
</script>

<div class="card-display">
	<div class="card-container">
		<Card padded>
			<Textfield variant="outlined" bind:value={valueA} label="Edit Title">
				<HelperText slot="Edit Title">Helper Text</HelperText>
			</Textfield>
			<br />
			<Textfield textarea input$maxlength={2500} bind:value label="Edit Content">
				<CharacterCounter slot="internalCounter">0 / 100</CharacterCounter>
			</Textfield>
			<br />
			<Button on:click={editPost}>Edit</Button>
		</Card>
	</div>
</div>

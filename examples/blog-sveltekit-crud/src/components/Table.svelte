<script lang="ts">
import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
import LinearProgress from "@smui/linear-progress";
import Button from "@smui/button";

export const items: any[] = [];
export const loaded = false;

async function deletePost(id: number) {
  const res = await fetch(`https://api.fake-rest.refine.dev/posts/${id}`, {
    method: "DELETE",
  }).then((res) => {
    res.json();
    location.reload();
  });
}
</script>

<DataTable table$aria-label="User list" style="width: 100%;">
	<Head>
		<Row>
			<Cell numeric>ID</Cell>
			<Cell>Title</Cell>
			<Cell>Image</Cell>
			<Cell>Date Created</Cell>
			<Cell>Actions</Cell>
		</Row>
	</Head>
	<Body>
		{#each items as item (item.id)}
			<Row>
				<Cell numeric>{item.id}</Cell>
				<Cell>{item.title}</Cell>
				<Cell><img width="100" src={item.image?.[0]?.url} alt="" /></Cell>
				<Cell>{item.createdAt}</Cell>
				<Cell>
					<a href={`/post/${item.id}`}>Edit</a>
					<Button on:click={() => deletePost(item.id)}>Delete</Button>
				</Cell>
			</Row>
		{/each}
	</Body>

	<LinearProgress
		indeterminate
		bind:closed={loaded}
		aria-label="Data is being loaded..."
		slot="progress"
	/>
</DataTable>

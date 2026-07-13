```tsx live url=http://localhost:3000/products previewHeight=200px hideCode
setInitialRoutes(["/"]);
// visible-block-start
import { useNotification } from "@pankod/refine-core";
import { Button, Stack } from "@pankod/refine-mui";

const ExamplePage: React.FC = () => {
  const { open, close } = useNotification();

    return (
        <Stack spacing={2} direction="row">
            <Button
                color="success"
                variant="outlined"
                size="small"
                onClick={() =>
                    open?.({
                        type: "success",
                        message: "Success",
                        description: "Success description",
                    })
                }
            >
                Success
            </Button>
            <Button
                color="error"
                variant="outlined"
                size="small"
                onClick={() =>
                    open?.({
                        type: "error",
                        message: "Error",
                        description: "Error description",
                    })
                }
            >
                Error
            </Button>

            <Button
                color="secondary"
                variant="outlined"
                size="small"
                onClick={() =>
                    open?.({
                        type: "progress",
                        message: "Progress",
                        undoableTimeout: 5,
                        cancelMutation: () => {
                            alert("cancelMutation")
                        }
                    })
                }
            >
                Progress
            </Button>
      </Stack>
    );
};
// visible-block-end
setRefineProps({
    DashboardPage: () => <ExamplePage />,
    resources: [
        {
            name: "post",
            create: () => {},
        },
    ],
});
render(<RefineMuiDemo />);
```
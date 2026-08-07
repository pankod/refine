import transformFunction from "./mutation-result-to-mutation-property";
import jscodeshift, { type JSCodeshift } from "jscodeshift";

const transform = (source: string) => {
  const j: JSCodeshift = jscodeshift.withParser("tsx");

  return transformFunction({ source }, { jscodeshift: j });
};

describe("mutation-result-to-mutation-property", () => {
  it("should handle destructuring mutation properties from useUpdate", () => {
    const source = `
      import { useUpdate } from "@refinedev/core";
      
      const { mutate, isLoading, isError, data } = useUpdate();
      
      if (isLoading) {
        return <div>Loading...</div>;
      }
      
      if (isError) {
        return <div>Error occurred</div>;
      }
    `;

    const expected = `
      import { useUpdate } from "@refinedev/core";
      
      const {
        mutate,

        mutation: {
          isPending,
          isError,
          data
        }
      } = useUpdate();
      
      if (isPending) {
        return <div>Loading...</div>;
      }
      
      if (isError) {
        return <div>Error occurred</div>;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle destructuring with renamed variables from useCreate", () => {
    const source = `
      import { useCreate } from "@refinedev/core";
      
      const { mutate, isLoading: isCreating, error: createError } = useCreate();
      
      if (isCreating) {
        return <div>Creating...</div>;
      }
    `;

    const expected = `
      import { useCreate } from "@refinedev/core";
      
      const {
        mutate,

        mutation: {
          isPending: isCreating,
          error: createError
        }
      } = useCreate();
      
      if (isCreating) {
        return <div>Creating...</div>;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle multiple mutation hooks", () => {
    const source = `
      import { useUpdate, useDelete } from "@refinedev/core";
      
      const { mutate: updateMutate, isLoading: updatePending } = useUpdate();
      const { mutate: deleteMutate, isLoading: deletePending } = useDelete();
      
      if (updatePending || deletePending) {
        return <div>Loading...</div>;
      }
    `;

    const expected = `
      import { useUpdate, useDelete } from "@refinedev/core";
      
      const { mutate: updateMutate, mutation: {
        isPending: updatePending
      } } = useUpdate();
      const { mutate: deleteMutate, mutation: {
        isPending: deletePending
      } } = useDelete();
      
      if (updatePending || deletePending) {
        return <div>Loading...</div>;
      }
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle direct variable assignment and property access", () => {
    const source = `
      import { useCustomMutation } from "@refinedev/core";
      
      const mutation = useCustomMutation();
      
      if (mutation.isLoading) {
        return <div>Loading...</div>;
      }
      
      const error = mutation.error;
      const data = mutation.data;
    `;

    const expected = `
      import { useCustomMutation } from "@refinedev/core";
      
      const mutation = useCustomMutation();
      
      if (mutation.mutation.isPending) {
        return <div>Loading...</div>;
      }
      
      const error = mutation.mutation.error;
      const data = mutation.mutation.data;
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle optional chaining", () => {
    const source = `
      import { useUpdate } from "@refinedev/core";
      
      const updateMutation = useUpdate();
      
      const isPending = updateMutation?.isLoading;
      const errorMessage = updateMutation?.error?.message;
    `;

    const expected = `
      import { useUpdate } from "@refinedev/core";
      
      const updateMutation = useUpdate();
      
      const isPending = updateMutation.mutation.isPending;
      const errorMessage = updateMutation.mutation.error?.message;
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should not affect properties that remain at the top level", () => {
    const source = `
      import { useUpdate } from "@refinedev/core";
      
      const { mutate, mutateAsync, overtime } = useUpdate();
      
      mutate({ id: 1, values: { name: "Test" } });
    `;

    const expected = `
      import { useUpdate } from "@refinedev/core";
      
      const { mutate, mutateAsync, overtime } = useUpdate();
      
      mutate({ id: 1, values: { name: "Test" } });
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle mixed properties (top-level and mutation)", () => {
    const source = `
      import { useCreateMany } from "@refinedev/core";
      
      const { mutate, mutateAsync, isLoading, error, overtime } = useCreateMany();
      
      if (isLoading) {
        return <div>Creating records...</div>;
      }
      
      if (error) {
        console.error(error);
      }
      
      const handleCreate = () => {
        mutate({ values: [{ name: "Item 1" }, { name: "Item 2" }] });
      };
    `;

    const expected = `
      import { useCreateMany } from "@refinedev/core";
      
      const {
        mutate,
        mutateAsync,
        overtime,

        mutation: {
          isPending,
          error
        }
      } = useCreateMany();
      
      if (isPending) {
        return <div>Creating records...</div>;
      }
      
      if (error) {
        console.error(error);
      }
      
      const handleCreate = () => {
        mutate({ values: [{ name: "Item 1" }, { name: "Item 2" }] });
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle all affected mutation hooks", () => {
    const source = `
      import { 
        useCreate, 
        useUpdate, 
        useDelete, 
        useCreateMany, 
        useUpdateMany, 
        useDeleteMany, 
        useCustomMutation 
      } from "@refinedev/core";
      
      const { isLoading: createPending } = useCreate();
      const { isLoading: updatePending } = useUpdate();
      const { isLoading: deletePending } = useDelete();
      const { isLoading: createManyPending } = useCreateMany();
      const { isLoading: updateManyPending } = useUpdateMany();
      const { isLoading: deleteManyPending } = useDeleteMany();
      const { isLoading: customPending } = useCustomMutation();
      
      const isAnyPending = createPending || updatePending || deletePending || 
                           createManyPending || updateManyPending || deleteManyPending || customPending;
    `;

    const expected = `
      import { 
        useCreate, 
        useUpdate, 
        useDelete, 
        useCreateMany, 
        useUpdateMany, 
        useDeleteMany, 
        useCustomMutation 
      } from "@refinedev/core";
      
      const { mutation: {
        isPending: createPending
      } } = useCreate();
      const { mutation: {
        isPending: updatePending
      } } = useUpdate();
      const { mutation: {
        isPending: deletePending
      } } = useDelete();
      const { mutation: {
        isPending: createManyPending
      } } = useCreateMany();
      const { mutation: {
        isPending: updateManyPending
      } } = useUpdateMany();
      const { mutation: {
        isPending: deleteManyPending
      } } = useDeleteMany();
      const { mutation: {
        isPending: customPending
      } } = useCustomMutation();
      
      const isAnyPending = createPending || updatePending || deletePending || 
                           createManyPending || updateManyPending || deleteManyPending || customPending;
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });

  it("should handle complex component example", () => {
    const source = `
      import { useUpdate, useDelete } from "@refinedev/core";

      export const ProductEdit = () => {
        const { mutate: updateMutate, isLoading: updatePending, error: updateError } = useUpdate();
        const { mutate: deleteMutate, isLoading: deletePending } = useDelete();
        
        const deleteProduct = useDelete();

        if (updatePending || deletePending) {
          return <div>Processing...</div>;
        }

        if (updateError) {
          return <div>Update failed: {updateError.message}</div>;
        }

        if (deleteProduct.isLoading) {
          return <div>Deleting...</div>;
        }

        return (
          <div>
            <button onClick={() => updateMutate({ id: 1, values: { name: "Updated" } })}>
              Update Product
            </button>
            <button onClick={() => deleteMutate({ id: 1 })}>
              Delete Product
            </button>
          </div>
        );
      };
    `;

    const expected = `
      import { useUpdate, useDelete } from "@refinedev/core";

      export const ProductEdit = () => {
        const {
          mutate: updateMutate,

          mutation: {
            isPending: updatePending,
            error: updateError
          }
        } = useUpdate();
        const { mutate: deleteMutate, mutation: {
          isPending: deletePending
        } } = useDelete();
        
        const deleteProduct = useDelete();

        if (updatePending || deletePending) {
          return <div>Processing...</div>;
        }

        if (updateError) {
          return <div>Update failed: {updateError.message}</div>;
        }

        if (deleteProduct.mutation.isPending) {
          return <div>Deleting...</div>;
        }

        return (
          <div>
            <button onClick={() => updateMutate({ id: 1, values: { name: "Updated" } })}>
              Update Product
            </button>
            <button onClick={() => deleteMutate({ id: 1 })}>
              Delete Product
            </button>
          </div>
        );
      };
    `;

    expect(transform(source).trim()).toBe(expected.trim());
  });
});

import { useShow } from "@refinedev/core";

import type { IPost } from "../../interfaces/post";

export const PostShow: React.FC = () => {
  const { query: queryResult } = useShow<IPost>();
  const { data } = queryResult;
  const record = data?.data;

  return (
    <div className="max-w-md">
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Id</label>
        <input
          value={record?.id}
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Name</label>
        <input
          value={record?.title}
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
        />
      </div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Title</label>
        <input
          value={record?.title}
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Content</label>
        <textarea
          disabled
          value={record?.content}
          id="content"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm "
          placeholder="Content"
          rows={10}
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Category</label>
        <input
          value={record?.category}
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Status</label>
        <input
          value={record?.Status}
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
        />
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium">Created At</label>
        <input
          type={"date"}
          value={record?.createdAt}
          disabled
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
        />
      </div>
    </div>
  );
};

import { useShow } from "@refinedev/core";
import {
  ShowView,
  ShowViewHeader,
} from "@/registry/new-york/refine-ui/views/show-view";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/registry/new-york/ui/card";
import { Badge } from "@/registry/new-york/ui/badge";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/registry/new-york/ui/avatar";
import { Label } from "@/registry/new-york/ui/label";
import { Separator } from "@/registry/new-york/ui/separator";
import { LoadingOverlay } from "@/registry/new-york/refine-ui/layout/loading-overlay";
import { Calendar, User, Tag, Image as ImageIcon, Hash } from "lucide-react";

import type { Post } from "../../types/resources";

export default function ShowPost() {
  const { query } = useShow<Post>();
  const post = query.data?.data;

  return (
    <ShowView>
      <ShowViewHeader />
      <LoadingOverlay loading={query.isFetching}>
        {post ? (
          <div className="w-full flex flex-col gap-10">
            {/* Title & Status */}
            <Card className="w-full px-6 py-12">
              <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 border-b pb-6">
                <div className="flex-shrink-0 flex items-center justify-start w-full md:w-auto">
                  {post.image?.[0]?.url ? (
                    <Avatar className="size-24 shadow-md">
                      <AvatarImage
                        src={post.image?.[0]?.url ?? ""}
                        alt={post.image?.[0]?.name ?? "Image"}
                      />
                      <AvatarFallback>{post.title?.[0] ?? "?"}</AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="size-24 shadow-md">
                      <AvatarFallback>{post.title?.[0] ?? "?"}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="flex-1 min-w-0 w-full flex flex-col gap-2 md:gap-3 items-start">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <CardTitle className="text-3xl font-bold truncate flex items-center gap-2">
                      <Hash className="w-5 h-5 text-muted-foreground" />
                      {post.title}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      style={{
                        backgroundColor: post.status_color,
                        color: "#fff",
                      }}
                      className="h-7 flex items-center px-3 text-base"
                    >
                      {post.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Post Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10 w-full">
                  <div>
                    <Label className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      User ID
                    </Label>
                    <div className="text-lg font-mono text-muted-foreground">
                      {post.user?.id}
                    </div>
                  </div>
                  <div>
                    <Label className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Category ID
                    </Label>
                    <div className="text-lg font-mono text-muted-foreground">
                      {post.category?.id}
                    </div>
                  </div>
                  <div>
                    <Label>Slug</Label>
                    <div className="text-muted-foreground">{post.slug}</div>
                  </div>
                  <div>
                    <Label>Hit</Label>
                    <div className="text-muted-foreground">{post.hit}</div>
                  </div>
                  <div>
                    <Label>Created At</Label>
                    <div className="text-muted-foreground">
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <Label>Language ID</Label>
                    <div className="text-muted-foreground">{post.language}</div>
                  </div>
                </div>
                <Separator />
                {/* Content Section */}
                <div className="mt-10">
                  <Label className="text-lg mb-2 block">Content</Label>
                  <div className="prose prose-sm w-full text-foreground bg-muted/40 rounded-md p-4 border">
                    {post.content}
                  </div>
                </div>
                {/* Images Section */}
                <div className="mt-10">
                  <Label className="text-lg mb-2 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    Images
                  </Label>
                  <div className="flex gap-4 flex-wrap items-end w-full">
                    {post.image && post.image.length > 0 ? (
                      post.image.map((img) => (
                        <div
                          key={img.uid}
                          className="flex flex-col items-center"
                        >
                          <Avatar className="size-20 border shadow">
                            <AvatarImage
                              src={img.url}
                              alt={img.name ?? "Image"}
                            />
                            <AvatarFallback>
                              {img.name?.[0] ?? "?"}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs mt-1 text-muted-foreground">
                            {img.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No Images</span>
                    )}
                  </div>
                </div>
                {/* Tags Section */}
                <div className="mt-10">
                  <Label className="text-lg mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Tags
                  </Label>
                  <div className="flex flex-wrap gap-2 items-center w-full">
                    {post.tags && post.tags.length > 0 ? (
                      post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No Tags</span>
                    )}
                  </div>
                </div>
                {/* Status Color Section */}
                <div className="mt-10">
                  <Label className="text-lg mb-2">Status Color</Label>
                  <div className="flex items-center gap-3 w-full">
                    <span
                      className="inline-block w-6 h-6 rounded-full border"
                      style={{ backgroundColor: post.status_color }}
                    />
                    <span className="font-mono text-muted-foreground">
                      {post.status_color}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </LoadingOverlay>
    </ShowView>
  );
}

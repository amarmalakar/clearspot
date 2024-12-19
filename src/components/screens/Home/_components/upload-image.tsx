import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CloudUpload } from "lucide-react";

export default function UploadImage() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Upload image</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] rounded-lg xl:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Upload image</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 relative">
          <div className="border-[4px] border-dashed rounded-lg h-[40vh] p-4">
            <div className="flex flex-col items-center justify-center h-full">
              <CloudUpload className="text-gray-500 w-12 h-12" />
              <p className="text-sm text-gray-500">
                Drag and drop files here or click to select files
              </p>
            </div>
          </div>
          <Input
            accept=".jpg,.jpeg,.png,.svg"
            className="absolute top-0 left-0 w-full h-full z-10 leading-none opacity-0"
            type="file"
            multiple
          />
        </div>
        <DialogFooter>
          <Button type="submit">Uplaod</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

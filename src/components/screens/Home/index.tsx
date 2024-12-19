import { useAuthProvider } from "@/components/provider/auth-provider";
import { galleryImages } from "@/constants";
import Logout from "@/components/auth/logout";
import UploadImage from "./_components/upload-image";

export default function Home() {
  const { currentUser } = useAuthProvider();
  return (
    <div>
      <nav className="px-4 py-2 shadow border-b">
        <div className="max-w-6xl m-auto flex items-center justify-between">
          <div>
            Hello{" "}
            <b>
              {currentUser?.displayName
                ? currentUser.displayName
                : currentUser?.email}
            </b>
          </div>

          <Logout />
        </div>
      </nav>

      <div className="max-w-6xl m-auto py-4 space-y-4">
        <UploadImage />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galleryImages.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />

              <button className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

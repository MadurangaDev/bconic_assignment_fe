import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BCONIC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};


import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { MapPin, Phone, Mail, Facebook, Youtube, Heart } from "lucide-react";

interface OrganizationInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrganizationInfoDialog: React.FC<OrganizationInfoDialogProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-marathi-orange" />
              <span className="text-marathi-orange font-bold text-2xl heading-cultural">प्रणिता प्रतिष्ठान</span>
            </div>
          </DialogTitle>
          <DialogDescription className="mb-4">
            <span className="text-yellow-900">समाजसेवेसाठी समर्पित</span>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Address */}
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-marathi-orange mt-1" />
            <div className="text-cultural text-gray-700">
              'धनश्री',<br />
              प्रभात कॉलनी, भुसावळ - 425201<br />
              महाराष्ट्र, भारत
            </div>
          </div>
          {/* Phone */}
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-marathi-orange" />
            <span className="text-cultural text-gray-700">+91 94203 48146</span>
          </div>
          {/* Email */}
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-marathi-orange" />
            <span className="text-cultural text-gray-700">pranitapratibsl@gmail.com</span>
          </div>
          {/* Socials */}
          <div className="flex gap-3 mt-2">
            <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500" title="Facebook">
              <Facebook className="h-5 w-5 text-white" />
            </a>
            <a href="https://youtube.com/@pranitapratishthan123?si=lCg-3n8B87s6IC5Y" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-500" title="YouTube">
              <Youtube className="h-5 w-5 text-white" />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationInfoDialog;

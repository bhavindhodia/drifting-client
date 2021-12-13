import { Button } from "@chakra-ui/button";

const meetingConfig = {
  apiKey: "a9aS3eawQBi9h-VJ99gsCw",
  meetingNumber: 12328942,
  userName: "user1",
  password: "tmpArgs.pwd",
  leaveUrl: "/",
  role: 0,
  userEmail: "bhavindhodia13@gmail.com",
  lang: "en",
  signature: "",
  webEndpoint: "zoom.us",
};

interface generateSignatureProps {
  apiKey: string;
  apiSecret: string;
  meetingNumber: string;
  role: string | number;
  success?: Function;
  error?: Function;
  userName: string;
  password: string;
  leaveUrl: string;
  userEmail: string;
  lang: string;
  signature: string;
  webEndpoint: string;
}

const Meeting = () => {
  return (
    <div>
      <Button>Meet</Button>
    </div>
  );
};

export default Meeting;

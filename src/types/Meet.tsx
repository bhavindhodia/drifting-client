export type MeetCardType = {
  id: number;
  title: string;
  teacherID: {
    name: string;
    id: string;
  };
  studentID: [
    {
      name: string;
      id: string;
    }
  ];
  meetID: {
    id: string;
    join_url: string;
    start_url: string;
  };
  notes: string;
  allDay: boolean;
  startDate: Date;
  endDate: Date;
  readOnly: boolean;
};

import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  HStack,
  Center,
  Spinner,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useUserData, useAppointmentStats } from "hooks";
import { ReactNode } from "react";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ComposedChart,
  Area,
  Bar,
} from "recharts";

interface StatsCardProps {
  title: string;
  stat: string | number;
  icon: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  const { data: userData } = useUserData();
  const { data: statsData } = useAppointmentStats();

  return userData === undefined || statsData === undefined ? (
    <Center>
      <Spinner />
    </Center>
  ) : (
    <>
      {/* Three Cards */}
      <Box maxW="7xl" mx={"auto"} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Welcome {userData?.user.name}
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          <StatsCard
            title={"Upcomping Meets"}
            stat={statsData.cardStatsData.upCommingMeet}
            icon={<BsPerson size={"3em"} />}
          />
          <StatsCard
            title={"No. of Students Registered"}
            stat={statsData.cardStatsData.registeredStudent}
            icon={<FiServer size={"3em"} />}
          />
          <StatsCard
            title={"Today's Meet"}
            stat={statsData.cardStatsData.todaysMeet}
            icon={<GoLocation size={"3em"} />}
          />
        </SimpleGrid>
      </Box>

      <Box height="500" mt={5}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            width={500}
            height={400}
            data={statsData.chartStatsData}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="studentRegistered"
              fill="#8884d8"
              stroke="#8884d8"
            />
            <Bar dataKey="studentRegistered" barSize={20} fill="#413ea0" />
            {/* <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            <Scatter dataKey="cnt" fill="red" /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}

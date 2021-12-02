import { FC } from "react";
import globalData from "data/globalData.json";
import { Heading, HeadingProps } from "@chakra-ui/layout";
type Props = {
  titleProps?: HeadingProps;
  iconWidth?: number;
  iconHeight?: number;
};
const Logo: FC<Props> = (props) => {
  return (
    <>
      <svg
        width={props.iconWidth ? props.iconWidth : 50}
        height={props.iconHeight ? props.iconHeight : 50}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clipPath="url(#prefix__clip0_10:535)">
          <path
            d="M48.592 17.87a4.794 4.794 0 005.009 1.827l.12-.03c3.315-.797 4.717-4.719 2.706-7.465C50.986 4.772 42.174-.042 32.237 0 15.991.068 2.7 13.293 2.584 29.51a29.56 29.56 0 004.59 16.084L0 62.128l18.398-6.136a29.692 29.692 0 0013.969 3.469c8.98 0 17.03-3.968 22.49-10.241 2.21-2.54 1.08-6.501-2.117-7.567-.04-.012-.08-.027-.12-.04a4.795 4.795 0 00-5.148 1.373 20.08 20.08 0 01-15.221 6.82 19.966 19.966 0 01-9.444-2.43l-10.619 3.542 4.022-9.271a19.906 19.906 0 01-3.952-11.628C12.102 18.8 21.164 9.656 32.367 9.656c6.66 0 12.565 3.232 16.225 8.213z"
            fill="url(#prefix__paint0_linear_10:535)"
          />
          <path
            d="M40.945 42.514a3.953 3.953 0 01-4.23 1.484c-2.732-.658-3.888-3.89-2.23-6.153 4.485-6.124 11.749-10.095 19.94-10.06 13.392.057 24.347 10.957 24.445 24.326a24.366 24.366 0 01-3.784 13.259L81 78.998l-15.167-5.057a24.481 24.481 0 01-11.515 2.86c-7.402 0-14.038-3.271-18.54-8.444-1.822-2.093-.89-5.359 1.746-6.237l.098-.033a3.951 3.951 0 014.246 1.132 16.557 16.557 0 0012.546 5.622c2.81-.015 5.462-.74 7.783-2.002l8.755 2.919-3.316-7.643a16.415 16.415 0 003.259-9.585c.129-9.247-7.342-16.785-16.577-16.785a16.565 16.565 0 00-13.373 6.77z"
            fill="url(#prefix__paint1_linear_10:535)"
          />
        </g>
        <defs>
          <linearGradient
            id="prefix__paint0_linear_10:535"
            x1={46.031}
            y1={2.108}
            x2={8.271}
            y2={76.494}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#030059" />
            <stop offset={0.371} stopColor="#080083" />
            <stop offset={0.753} stopColor="#1773D1" />
            <stop offset={1} stopColor="#1773D1" />
          </linearGradient>
          <linearGradient
            id="prefix__paint1_linear_10:535"
            x1={57.359}
            y1={20.833}
            x2={57.359}
            y2={129.152}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#268036" />
            <stop offset={0.393} stopColor="#41A950" />
            <stop offset={0.706} stopColor="#87D69A" />
            <stop offset={1} stopColor="#29418E" />
          </linearGradient>
          <clipPath id="prefix__clip0_10:535">
            <path fill="#fff" d="M0 0h81v79H0z" />
          </clipPath>
        </defs>
      </svg>
      <Heading size="lg" fontWeight="bold" {...props.titleProps}>
        {globalData.appName}
      </Heading>
    </>
  );
};

export default Logo;

import { cn } from "@/utils/cn";

export const BackgroundTile = ({ className }: { className: string }) => {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-full", className)}
    >
      <defs>
        <pattern
          id="customPattern"
          width="275"
          height="274"
          patternUnits="userSpaceOnUse"
        >
          <g clip-path="url(#clip0_1_33)">
            <circle
              cx="84.5"
              cy="14.5"
              r="6.5"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="40"
              y1="4.37114e-08"
              x2="40"
              y2="7"
              stroke="currentColor"
              stroke-width="2"
            />
            <rect
              x="7.32663"
              y="43.2178"
              width="7.76061"
              height="7.76061"
              transform="rotate(-38.7348 7.32663 43.2178)"
              stroke="currentColor"
              stroke-width="2"
            />
            <circle cx="93.5" cy="62.5" r="2.5" fill="currentColor" />
            <line
              x1="-0.157658"
              y1="87.1161"
              x2="6.7548"
              y2="86.0125"
              stroke="currentColor"
              stroke-width="2"
            />
            <rect
              x="24"
              y="181"
              width="5.2074"
              height="14.7609"
              transform="rotate(-7.133 24 181)"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M44.1767 99.5886L56.1854 103.833L42.8817 112.259L44.1767 99.5886Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M150.355 76.643L156.864 84.5966L152.188 93.7487L145.679 85.7952L150.355 76.643Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="140.588"
              y1="27.1913"
              x2="151.588"
              y2="35.1913"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="212.988"
              y1="65.8479"
              x2="214.988"
              y2="78.8479"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M230.404 24.5888L218.905 27.1637L227.646 13.1326L230.404 24.5888Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <line
              x1="58.331"
              y1="160.257"
              x2="68.331"
              y2="151.257"
              stroke="currentColor"
              stroke-width="2"
            />
            <circle cx="7" cy="246" r="2" fill="currentColor" />
            <rect
              x="109.26"
              y="120.592"
              width="4.94475"
              height="4.42535"
              transform="rotate(16.5406 109.26 120.592)"
              fill="currentColor"
            />
            <path
              d="M244 115C243.667 113 243.8 108.6 247 107C251 105 254 107 256.5 111M109.5 175.5H121V164"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M190.118 161.067L196.389 159.554L200.763 164.295L198.858 170.576L192.588 172.089L188.213 167.348L190.118 161.067Z"
              stroke="currentColor"
              stroke-width="2"
            />
            <circle
              cx="236"
              cy="239"
              r="4"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M212 210.5L221.5 219"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M151.5 244L145 236L157 234.5L151.5 244Z"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
            />
            <path
              d="M84.6547 220.07L86.3297 224.07L81.9954 223.93L80.3205 219.93L84.6547 220.07Z"
              fill="currentColor"
            />
            <path
              d="M156.852 191.046L159.939 193.756L156.894 195.154L156.852 191.046Z"
              fill="currentColor"
            />
            <path
              d="M193.268 121.336L190.531 117.98L194.805 117.287L193.268 121.336Z"
              fill="currentColor"
            />
            <path
              d="M250.58 170.5H250.587L250.578 170.524L250.58 170.5ZM249.053 170.606L248.5 170.882V166.659L249.647 166.168L249.019 169.304L248.78 170.5H249.264L249.053 170.606Z"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="2"
            />
          </g>
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#customPattern)" />
    </svg>
  );
};

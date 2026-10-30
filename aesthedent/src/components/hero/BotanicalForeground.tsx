/**
 * Out-of-focus foliage that echoes the reference's photographic depth.
 * Purely decorative, kept away from interactive content.
 */
export default function BotanicalForeground() {
  return (
    <div className="botanical" aria-hidden="true">
      <svg className="botanical__left" viewBox="0 0 420 520" fill="none" focusable="false">
        <path
          d="M206 520c-6-108 2-203 35-288 18-44 52-89 90-132"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".8"
        />
        {[
          [236, 270, -28, 1.05],
          [210, 330, -54, 0.9],
          [264, 232, 8, 0.82],
          [196, 392, -68, 0.7],
          [286, 298, 34, 0.72],
        ].map(([x, y, rotate, scale], index) => (
          <path
            key={index}
            transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
            d="M0 0C28-46 78-58 116-38 90 4 48 26 0 0Z"
            fill="currentColor"
            opacity={0.72 - index * 0.07}
          />
        ))}
        <path
          d="M28 500C80 438 90 388 72 342c-20 16-30 44-28 76 1 28 13 52 34 82"
          fill="currentColor"
          opacity=".36"
        />
        <path
          d="M330 470c-24-54-13-102 16-146 38 30 47 72 26 115-10 20-25 36-42 31Z"
          fill="currentColor"
          opacity=".3"
        />
      </svg>

      <svg className="botanical__right" viewBox="0 0 300 460" fill="none" focusable="false">
        <path
          d="M150 460c4-110 24-201 62-276 18-35 43-70 72-105"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity=".75"
        />
        {[
          [172, 300, -18, 0.82],
          [156, 372, -44, 0.66],
          [210, 238, 22, 0.6],
        ].map(([x, y, rotate, scale], index) => (
          <path
            key={index}
            transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
            d="M0 0C24-42 68-52 102-34 78 4 42 22 0 0Z"
            fill="currentColor"
            opacity={0.64 - index * 0.1}
          />
        ))}
      </svg>
    </div>
  );
}

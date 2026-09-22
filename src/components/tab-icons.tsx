import Svg, { Circle, Path } from 'react-native-svg';

type IconProps = { color: string; size?: number; filled?: boolean };

/** Simple outline/filled pairs for the web tab bar, in the spirit of SF Symbols. */
export function HomeIcon({ color, size = 24, filled }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round">
      <Path d="M3.5 11.5 12 4l8.5 7.5V20a1 1 0 0 1-1 1h-5v-6H9.5v6h-5a1 1 0 0 1-1-1v-8.5Z" />
    </Svg>
  );
}

export function TagIcon({ color, size = 24, filled }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round">
      <Path d="M3.5 12.6V4.5a1 1 0 0 1 1-1h8.1a1 1 0 0 1 .7.3l7.4 7.4a1 1 0 0 1 0 1.4l-8.1 8.1a1 1 0 0 1-1.4 0L3.8 13.3a1 1 0 0 1-.3-.7Z" />
      <Circle cx={8} cy={8} r={1.4} fill={filled ? '#fff' : 'none'} stroke={filled ? 'none' : color} />
    </Svg>
  );
}

export function PinIcon({ color, size = 24, filled }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round">
      <Path d="M12 21.5s-6.5-6.2-6.5-11.3a6.5 6.5 0 0 1 13 0c0 5.1-6.5 11.3-6.5 11.3Z" />
      <Circle cx={12} cy={10.2} r={2.4} fill={filled ? '#fff' : 'none'} stroke={filled ? 'none' : color} />
    </Svg>
  );
}

export function PersonIcon({ color, size = 24, filled }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinejoin="round" strokeLinecap="round">
      <Circle cx={12} cy={12} r={9} fill={filled ? color : 'none'} />
      <Circle cx={12} cy={9.6} r={3} fill={filled ? '#fff' : 'none'} stroke={filled ? 'none' : color} />
      <Path d="M6.4 18.2c1.2-2.3 3.2-3.4 5.6-3.4s4.4 1.1 5.6 3.4" stroke={filled ? '#fff' : color} />
    </Svg>
  );
}

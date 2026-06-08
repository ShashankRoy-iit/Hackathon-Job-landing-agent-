declare module 'react' {
  export type ReactNode = any;
  export type ReactElement = any;
  export type SetStateAction<T> = T | ((prevState: T) => T);
  export type Dispatch<A> = (value: A) => void;
  export type FormEvent<T = any> = any;
  export type ChangeEvent<T = any> = any;

  export function useState<T>(initialState: T): [T, Dispatch<SetStateAction<T>>];
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps?: unknown[]): T;
  export const StrictMode: any;

  const React: any;
  export default React;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment): {
    render: (element: any) => void;
  };
}

declare module 'motion/react' {
  export const motion: any;
  export const AnimatePresence: any;
}

declare module 'lucide-react' {
  export const Sparkles: any;
  export const Compass: any;
  export const Shield: any;
  export const HelpCircle: any;
  export const ChevronRight: any;
  export const LayoutDashboard: any;
  export const Search: any;
  export const FileText: any;
  export const Send: any;
  export const CheckSquare: any;
  export const GraduationCap: any;
  export const PlayCircle: any;
  export const KeyRound: any;
  export const LogIn: any;
  export const ChevronDown: any;
  export const X: any;
  export const PlaySquare: any;
  export const ArrowUpRight: any;
  export const ShieldCheck: any;
  export const Cpu: any;
  export const ArrowRight: any;
  export const Mail: any;
  export const Lock: any;
  export const Eye: any;
  export const EyeOff: any;
  export const Chrome: any;
  export const Linkedin: any;
  export const Check: any;
  export const Award: any;
  export const ArrowLeft: any;
  export const User: any;
  export const Briefcase: any;
  export const Target: any;
  export const Users2: any;
  export const FileCheck2: any;
  export const GitMerge: any;
  export const ThumbsUp: any;
  export const MapPin: any;
  export const DollarSign: any;
  export const Filter: any;
  export const Star: any;
  export const Plus: any;
  export const CheckCircle: any;
  export const Loader2: any;
  export const BrainCircuit: any;
  export const Tags: any;
  export const Globe2: any;
  export const Bell: any;
  export const Eye: any;
  export const BriefcaseBusiness: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
import { forwardRef } from 'react';
import InfinityTechLogo from '../InfinityTechLogo';

// ============================================================
// FestivalLogo — delegating to pure vector InfinityTechLogo component
// from infinity-tech-website-package.
// ============================================================
const FestivalLogo = forwardRef(function FestivalLogo({ className, title, ...rest }, ref) {
  return <InfinityTechLogo ref={ref} className={className} size={1254} {...rest} />;
});

export default FestivalLogo;

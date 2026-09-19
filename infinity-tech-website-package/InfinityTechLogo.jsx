import { useId } from "react";

/** Static, independently targetable vector artwork. Scope animation to your own wrapper. */
export default function InfinityTechLogo({ size = 512, className, style }) {
  const uid = "infinity-tech-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
<svg className={className} style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254" width={size} height={size} fill="none" role="img" aria-labelledby={`${uid}-logo-title ${uid}-logo-description`}>
<title id={`${uid}-logo-title`}>Infinity technology festival logo</title>
<desc id={`${uid}-logo-description`}>Pure vector recreation: six separate engineering branches and icons surrounding independent cyan rings and a luminous infinity. Transparent background; static by default.</desc>
<defs>
 <radialGradient id={`${uid}-hub-gradient`}><stop offset="0" stopColor="#102c45" stopOpacity=".6"/><stop offset=".78" stopColor="#061729" stopOpacity=".84"/><stop offset="1" stopColor="#09374c" stopOpacity=".9"/></radialGradient>
 <linearGradient id={`${uid}-ring-gradient`} x1="420" y1="420" x2="815" y2="820" gradientUnits="userSpaceOnUse"><stop stopColor="#02a8ed"/><stop offset=".22" stopColor="#8dffff"/><stop offset=".43" stopColor="#10cce9"/><stop offset=".68" stopColor="#ccffff"/><stop offset="1" stopColor="#008cf0"/></linearGradient>
 <linearGradient id={`${uid}-infinity-gradient`} x1="475" y1="540" x2="775" y2="690" gradientUnits="userSpaceOnUse"><stop stopColor="#45c6ff"/><stop offset=".25" stopColor="#e6ffff"/><stop offset=".46" stopColor="#50dcec"/><stop offset=".7" stopColor="#148ecf"/><stop offset=".87" stopColor="#d8ffff"/><stop offset="1" stopColor="#3baaff"/></linearGradient>
 <linearGradient id={`${uid}-crossing-gradient`} x1="540" y1="565" x2="710" y2="660" gradientUnits="userSpaceOnUse"><stop stopColor="#d9ffff"/><stop offset=".5" stopColor="#a4f5ff"/><stop offset="1" stopColor="#36bff0"/></linearGradient>
 <filter id={`${uid}-neon-glow`} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB"><feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id={`${uid}-hub-glow`} x="-40%" y="-40%" width="180%" height="180%" colorInterpolationFilters="sRGB"><feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
<g id={`${uid}-logo-art`} data-part="logo-art" strokeLinecap="round" strokeLinejoin="round">
<g id={`${uid}-outer-technology-rings`} data-part="outer-technology-rings" >
<circle id={`${uid}-outer-track`} cx="627" cy="625" r="383" stroke="#074167" strokeWidth="9" opacity=".34"/>
<circle id={`${uid}-outer-hairline`} cx="627" cy="625" r="358" stroke="#087eaa" strokeWidth="1.5" opacity=".65"/>
<g id={`${uid}-outer-segments`} data-part="outer-segments" stroke="#0879b4" strokeWidth="5" opacity=".42">
<path id={`${uid}-outer-segment-01`} d="M 998.773 637.983 A 372 372 0 0 1 993.348 689.597" />
<path id={`${uid}-outer-segment-02`} d="M 982.745 733.762 A 372 372 0 0 1 964.146 782.214" />
<path id={`${uid}-outer-segment-03`} d="M 942.474 822.130 A 372 372 0 0 1 911.969 864.117" />
<path id={`${uid}-outer-segment-04`} d="M 880.703 897.064 A 372 372 0 0 1 840.370 929.725" />
<path id={`${uid}-outer-segment-05`} d="M 801.643 953.457 A 372 372 0 0 1 754.231 974.566" />
<path id={`${uid}-outer-segment-06`} d="M 710.682 987.466 A 372 372 0 0 1 659.422 995.584" />
<path id={`${uid}-outer-segment-07`} d="M 614.017 996.773 A 372 372 0 0 1 562.403 991.348" />
<path id={`${uid}-outer-segment-08`} d="M 518.238 980.745 A 372 372 0 0 1 469.786 962.146" />
<path id={`${uid}-outer-segment-09`} d="M 429.870 940.474 A 372 372 0 0 1 387.883 909.969" />
<path id={`${uid}-outer-segment-10`} d="M 354.936 878.703 A 372 372 0 0 1 322.275 838.370" />
<path id={`${uid}-outer-segment-11`} d="M 298.543 799.643 A 372 372 0 0 1 277.434 752.231" />
<path id={`${uid}-outer-segment-12`} d="M 264.534 708.682 A 372 372 0 0 1 256.416 657.422" />
<path id={`${uid}-outer-segment-13`} d="M 255.227 612.017 A 372 372 0 0 1 260.652 560.403" />
<path id={`${uid}-outer-segment-14`} d="M 271.255 516.238 A 372 372 0 0 1 289.854 467.786" />
<path id={`${uid}-outer-segment-15`} d="M 311.526 427.870 A 372 372 0 0 1 342.031 385.883" />
<path id={`${uid}-outer-segment-16`} d="M 373.297 352.936 A 372 372 0 0 1 413.630 320.275" />
<path id={`${uid}-outer-segment-17`} d="M 452.357 296.543 A 372 372 0 0 1 499.769 275.434" />
<path id={`${uid}-outer-segment-18`} d="M 543.318 262.534 A 372 372 0 0 1 594.578 254.416" />
<path id={`${uid}-outer-segment-19`} d="M 639.983 253.227 A 372 372 0 0 1 691.597 258.652" />
<path id={`${uid}-outer-segment-20`} d="M 735.762 269.255 A 372 372 0 0 1 784.214 287.854" />
<path id={`${uid}-outer-segment-21`} d="M 824.130 309.526 A 372 372 0 0 1 866.117 340.031" />
<path id={`${uid}-outer-segment-22`} d="M 899.064 371.297 A 372 372 0 0 1 931.725 411.630" />
<path id={`${uid}-outer-segment-23`} d="M 955.457 450.357 A 372 372 0 0 1 976.566 497.769" />
<path id={`${uid}-outer-segment-24`} d="M 989.466 541.318 A 372 372 0 0 1 997.584 592.578" />
</g>
<g id={`${uid}-outer-ticks`} data-part="outer-ticks" stroke="#81cce9">
<path id={`${uid}-tick-01`} d="M 937.000 625.000 L 951.000 625.000" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-02`} d="M 942.794 652.628 L 949.767 653.238" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-03`} d="M 939.184 680.046 L 946.078 681.262" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-04`} d="M 926.437 705.234 L 939.960 708.857" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-05`} d="M 924.883 733.420 L 931.460 735.815" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-06`} d="M 914.300 758.970 L 920.644 761.928" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-07`} d="M 895.468 780.000 L 907.592 787.000" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-08`} d="M 886.671 806.824 L 892.405 810.839" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-09`} d="M 869.836 828.764 L 875.198 833.263" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-10`} d="M 846.203 844.203 L 856.103 854.103" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-11`} d="M 830.764 867.836 L 835.263 873.198" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-12`} d="M 808.824 884.671 L 812.839 890.405" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-13`} d="M 782.000 893.468 L 789.000 905.592" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-14`} d="M 760.970 912.300 L 763.928 918.644" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-15`} d="M 735.420 922.883 L 737.815 929.460" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-16`} d="M 707.234 924.437 L 710.857 937.960" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-17`} d="M 682.046 937.184 L 683.262 944.078" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-18`} d="M 654.628 940.794 L 655.238 947.767" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-19`} d="M 627.000 935.000 L 627.000 949.000" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-20`} d="M 599.372 940.794 L 598.762 947.767" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-21`} d="M 571.954 937.184 L 570.738 944.078" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-22`} d="M 546.766 924.437 L 543.143 937.960" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-23`} d="M 518.580 922.883 L 516.185 929.460" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-24`} d="M 493.030 912.300 L 490.072 918.644" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-25`} d="M 472.000 893.468 L 465.000 905.592" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-26`} d="M 445.176 884.671 L 441.161 890.405" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-27`} d="M 423.236 867.836 L 418.737 873.198" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-28`} d="M 407.797 844.203 L 397.897 854.103" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-29`} d="M 384.164 828.764 L 378.802 833.263" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-30`} d="M 367.329 806.824 L 361.595 810.839" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-31`} d="M 358.532 780.000 L 346.408 787.000" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-32`} d="M 339.700 758.970 L 333.356 761.928" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-33`} d="M 329.117 733.420 L 322.540 735.815" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-34`} d="M 327.563 705.234 L 314.040 708.857" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-35`} d="M 314.816 680.046 L 307.922 681.262" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-36`} d="M 311.206 652.628 L 304.233 653.238" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-37`} d="M 317.000 625.000 L 303.000 625.000" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-38`} d="M 311.206 597.372 L 304.233 596.762" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-39`} d="M 314.816 569.954 L 307.922 568.738" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-40`} d="M 327.563 544.766 L 314.040 541.143" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-41`} d="M 329.117 516.580 L 322.540 514.185" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-42`} d="M 339.700 491.030 L 333.356 488.072" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-43`} d="M 358.532 470.000 L 346.408 463.000" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-44`} d="M 367.329 443.176 L 361.595 439.161" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-45`} d="M 384.164 421.236 L 378.802 416.737" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-46`} d="M 407.797 405.797 L 397.897 395.897" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-47`} d="M 423.236 382.164 L 418.737 376.802" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-48`} d="M 445.176 365.329 L 441.161 359.595" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-49`} d="M 472.000 356.532 L 465.000 344.408" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-50`} d="M 493.030 337.700 L 490.072 331.356" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-51`} d="M 518.580 327.117 L 516.185 320.540" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-52`} d="M 546.766 325.563 L 543.143 312.040" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-53`} d="M 571.954 312.816 L 570.738 305.922" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-54`} d="M 599.372 309.206 L 598.762 302.233" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-55`} d="M 627.000 315.000 L 627.000 301.000" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-56`} d="M 654.628 309.206 L 655.238 302.233" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-57`} d="M 682.046 312.816 L 683.262 305.922" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-58`} d="M 707.234 325.563 L 710.857 312.040" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-59`} d="M 735.420 327.117 L 737.815 320.540" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-60`} d="M 760.970 337.700 L 763.928 331.356" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-61`} d="M 782.000 356.532 L 789.000 344.408" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-62`} d="M 808.824 365.329 L 812.839 359.595" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-63`} d="M 830.764 382.164 L 835.263 376.802" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-64`} d="M 846.203 405.797 L 856.103 395.897" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-65`} d="M 869.836 421.236 L 875.198 416.737" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-66`} d="M 886.671 443.176 L 892.405 439.161" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-67`} d="M 895.468 470.000 L 907.592 463.000" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-68`} d="M 914.300 491.030 L 920.644 488.072" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-69`} d="M 924.883 516.580 L 931.460 514.185" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-70`} d="M 926.437 544.766 L 939.960 541.143" strokeWidth="2.5" opacity="0.64"/>
<path id={`${uid}-tick-71`} d="M 939.184 569.954 L 946.078 568.738" strokeWidth="1.5" opacity="0.3"/>
<path id={`${uid}-tick-72`} d="M 942.794 597.372 L 949.767 596.762" strokeWidth="1.5" opacity="0.3"/>
</g>
<g id={`${uid}-outer-orbit`} data-part="outer-orbit" data-center-x="627" data-center-y="625">
<circle id={`${uid}-orbit-track`} cx="627" cy="625" r="295" stroke="#046896" strokeWidth="3" opacity=".5"/>
<path id={`${uid}-orbit-arc-1`} d="M 917.518 676.226 A 295 295 0 0 1 865.660 798.397" stroke="#25d4ff" strokeWidth="3" filter={`url(#${uid}-neon-glow)`}/>
<circle id={`${uid}-orbit-light-1`} cx="865.66" cy="798.397" r="3.5" fill="#d4ffff" filter={`url(#${uid}-neon-glow)`}/>
<path id={`${uid}-orbit-arc-2`} d="M 727.896 902.209 A 295 295 0 0 1 596.164 918.384" stroke="#25d4ff" strokeWidth="3" filter={`url(#${uid}-neon-glow)`}/>
<circle id={`${uid}-orbit-light-2`} cx="596.164" cy="918.384" r="3.5" fill="#d4ffff" filter={`url(#${uid}-neon-glow)`}/>
<path id={`${uid}-orbit-arc-3`} d="M 437.378 850.983 A 295 295 0 0 1 357.504 744.987" stroke="#25d4ff" strokeWidth="3" filter={`url(#${uid}-neon-glow)`}/>
<circle id={`${uid}-orbit-light-3`} cx="357.504" cy="744.987" r="3.5" fill="#d4ffff" filter={`url(#${uid}-neon-glow)`}/>
<path id={`${uid}-orbit-arc-4`} d="M 336.482 573.774 A 295 295 0 0 1 388.340 451.603" stroke="#25d4ff" strokeWidth="3" filter={`url(#${uid}-neon-glow)`}/>
<circle id={`${uid}-orbit-light-4`} cx="388.34" cy="451.603" r="3.5" fill="#d4ffff" filter={`url(#${uid}-neon-glow)`}/>
<path id={`${uid}-orbit-arc-5`} d="M 526.104 347.791 A 295 295 0 0 1 657.836 331.616" stroke="#25d4ff" strokeWidth="3" filter={`url(#${uid}-neon-glow)`}/>
<circle id={`${uid}-orbit-light-5`} cx="657.836" cy="331.616" r="3.5" fill="#d4ffff" filter={`url(#${uid}-neon-glow)`}/>
<path id={`${uid}-orbit-arc-6`} d="M 816.622 399.017 A 295 295 0 0 1 896.496 505.013" stroke="#25d4ff" strokeWidth="3" filter={`url(#${uid}-neon-glow)`}/>
<circle id={`${uid}-orbit-light-6`} cx="896.496" cy="505.013" r="3.5" fill="#d4ffff" filter={`url(#${uid}-neon-glow)`}/>
</g>
</g>
<g id={`${uid}-engineering-branches`} data-part="engineering-branches" >
<g id={`${uid}-branch-innovation`} data-part="branch-innovation" data-color="#ffb526">
<g id={`${uid}-traces-innovation`} data-part="traces-innovation" stroke="#ffb526" strokeWidth="8">
<path id={`${uid}-trace-innovation-1`} d="M 580 436 Q 588 412 588 379 V 274 L 555 247 V 196" />
<path id={`${uid}-trace-innovation-2`} d="M 598 429 Q 607 409 607 378 V 230" />
<path id={`${uid}-trace-innovation-3`} d="M 616 426 Q 627 404 627 377 V 186" />
<path id={`${uid}-trace-innovation-4`} d="M 637 426 Q 647 405 647 378 V 245" />
<path id={`${uid}-trace-innovation-5`} d="M 654 429 Q 664 408 664 380 V 283 L 697 249 V 196" />
</g>
<g id={`${uid}-terminals-innovation`} data-part="terminals-innovation" >
<g id={`${uid}-terminal-innovation-1`} data-part="terminal-innovation-1" >
<circle id={`${uid}-terminal-innovation-1-rim`} cx="555" cy="196" r="11" fill="#071621" stroke="#ffb526" strokeWidth="6"/>
<circle id={`${uid}-terminal-innovation-1-light`} cx="555" cy="196" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-innovation-2`} data-part="terminal-innovation-2" >
<circle id={`${uid}-terminal-innovation-2-rim`} cx="607" cy="230" r="11" fill="#071621" stroke="#ffb526" strokeWidth="6"/>
<circle id={`${uid}-terminal-innovation-2-light`} cx="607" cy="230" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-innovation-3`} data-part="terminal-innovation-3" >
<circle id={`${uid}-terminal-innovation-3-rim`} cx="647" cy="245" r="11" fill="#071621" stroke="#ffb526" strokeWidth="6"/>
<circle id={`${uid}-terminal-innovation-3-light`} cx="647" cy="245" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-innovation-4`} data-part="terminal-innovation-4" >
<circle id={`${uid}-terminal-innovation-4-rim`} cx="697" cy="196" r="11" fill="#071621" stroke="#ffb526" strokeWidth="6"/>
<circle id={`${uid}-terminal-innovation-4-light`} cx="697" cy="196" r="5" fill="#e5ffff"/>
</g>
</g>
<g id={`${uid}-icon-innovation`} data-part="icon-innovation" data-center-x="627" data-center-y="110">
<g id={`${uid}-icon-innovation-position`} data-part="icon-innovation-position" transform="translate(627 110)" stroke="#ffb526" strokeWidth="6">
<circle id={`${uid}-icon-innovation-boundary`} cx="0" cy="0" r="76" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-icon-innovation-symbol`} data-part="icon-innovation-symbol" >
<path id={`${uid}-bulb-outline`} d="M -13 24 C -13 3 -25 0 -25 -16 C -25 -50 25 -50 25 -16 C 25 0 13 3 13 24 Z M -11 33 H 11 M -6 41 H 6" />
<path id={`${uid}-bulb-filament`} d="M 0 23 V -12 M -10 -22 L 0 -12 L 10 -22" strokeWidth="4.5"/>
<path id={`${uid}-bulb-ray-1`} d="M 0 -60 L 0 -50" strokeWidth="4"/>
<path id={`${uid}-bulb-ray-2`} d="M -43 -43 L -37 -37" strokeWidth="4"/>
<path id={`${uid}-bulb-ray-3`} d="M 43 -43 L 37 -37" strokeWidth="4"/>
<path id={`${uid}-bulb-ray-4`} d="M -51 -5 L -41 -5" strokeWidth="4"/>
<path id={`${uid}-bulb-ray-5`} d="M 51 -5 L 41 -5" strokeWidth="4"/>
</g>
</g>
</g>
</g>
<g id={`${uid}-branch-computing`} data-part="branch-computing" data-color="#ed48e9">
<g id={`${uid}-traces-computing`} data-part="traces-computing" stroke="#ed48e9" strokeWidth="8">
<path id={`${uid}-trace-computing-1`} d="M 459 492 L 360 410 L 353 365 L 314 333" />
<path id={`${uid}-trace-computing-2`} d="M 447 508 L 323 395" />
<path id={`${uid}-trace-computing-3`} d="M 435 524 L 254 376" />
<path id={`${uid}-trace-computing-4`} d="M 425 541 L 294 428" />
<path id={`${uid}-trace-computing-5`} d="M 418 560 L 318 471 L 278 478 L 240 443" />
</g>
<g id={`${uid}-terminals-computing`} data-part="terminals-computing" >
<g id={`${uid}-terminal-computing-1`} data-part="terminal-computing-1" >
<circle id={`${uid}-terminal-computing-1-rim`} cx="314" cy="333" r="11" fill="#071621" stroke="#ed48e9" strokeWidth="6"/>
<circle id={`${uid}-terminal-computing-1-light`} cx="314" cy="333" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-computing-2`} data-part="terminal-computing-2" >
<circle id={`${uid}-terminal-computing-2-rim`} cx="323" cy="395" r="11" fill="#071621" stroke="#ed48e9" strokeWidth="6"/>
<circle id={`${uid}-terminal-computing-2-light`} cx="323" cy="395" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-computing-3`} data-part="terminal-computing-3" >
<circle id={`${uid}-terminal-computing-3-rim`} cx="294" cy="428" r="11" fill="#071621" stroke="#ed48e9" strokeWidth="6"/>
<circle id={`${uid}-terminal-computing-3-light`} cx="294" cy="428" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-computing-4`} data-part="terminal-computing-4" >
<circle id={`${uid}-terminal-computing-4-rim`} cx="240" cy="443" r="11" fill="#071621" stroke="#ed48e9" strokeWidth="6"/>
<circle id={`${uid}-terminal-computing-4-light`} cx="240" cy="443" r="5" fill="#e5ffff"/>
</g>
</g>
<g id={`${uid}-icon-computing`} data-part="icon-computing" data-center-x="190" data-center-y="334">
<g id={`${uid}-icon-computing-position`} data-part="icon-computing-position" transform="translate(190 334)" stroke="#ed48e9" strokeWidth="6">
<circle id={`${uid}-icon-computing-boundary`} cx="0" cy="0" r="79" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-icon-computing-symbol`} data-part="icon-computing-symbol" >
<rect id={`${uid}-chip-body`} x="-33" y="-33" width="66" height="66" rx="3"/>
<rect id={`${uid}-chip-core`} x="-21" y="-21" width="42" height="42" rx="1" strokeWidth="4"/>
<path id={`${uid}-chip-pin-top-1`} d="M -21 -44 V -55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-bottom-1`} d="M -21 44 V 55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-left-1`} d="M -44 -21 H -55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-right-1`} d="M 44 -21 H 55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-top-2`} d="M -7 -44 V -55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-bottom-2`} d="M -7 44 V 55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-left-2`} d="M -44 -7 H -55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-right-2`} d="M 44 -7 H 55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-top-3`} d="M 7 -44 V -55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-bottom-3`} d="M 7 44 V 55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-left-3`} d="M -44 7 H -55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-right-3`} d="M 44 7 H 55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-top-4`} d="M 21 -44 V -55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-bottom-4`} d="M 21 44 V 55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-left-4`} d="M -44 21 H -55" strokeWidth="5"/>
<path id={`${uid}-chip-pin-right-4`} d="M 44 21 H 55" strokeWidth="5"/>
</g>
</g>
</g>
</g>
<g id={`${uid}-branch-software`} data-part="branch-software" data-color="#73f14c">
<g id={`${uid}-traces-software`} data-part="traces-software" stroke="#73f14c" strokeWidth="8">
<path id={`${uid}-trace-software-1`} d="M 792 492 L 890 410 L 896 365 L 938 333" />
<path id={`${uid}-trace-software-2`} d="M 805 508 L 931 389" />
<path id={`${uid}-trace-software-3`} d="M 817 525 L 999 376" />
<path id={`${uid}-trace-software-4`} d="M 826 542 L 948 428" />
<path id={`${uid}-trace-software-5`} d="M 835 560 L 925 468 L 968 478 L 1013 443" />
</g>
<g id={`${uid}-terminals-software`} data-part="terminals-software" >
<g id={`${uid}-terminal-software-1`} data-part="terminal-software-1" >
<circle id={`${uid}-terminal-software-1-rim`} cx="938" cy="333" r="11" fill="#071621" stroke="#73f14c" strokeWidth="6"/>
<circle id={`${uid}-terminal-software-1-light`} cx="938" cy="333" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-software-2`} data-part="terminal-software-2" >
<circle id={`${uid}-terminal-software-2-rim`} cx="931" cy="389" r="11" fill="#071621" stroke="#73f14c" strokeWidth="6"/>
<circle id={`${uid}-terminal-software-2-light`} cx="931" cy="389" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-software-3`} data-part="terminal-software-3" >
<circle id={`${uid}-terminal-software-3-rim`} cx="948" cy="428" r="11" fill="#071621" stroke="#73f14c" strokeWidth="6"/>
<circle id={`${uid}-terminal-software-3-light`} cx="948" cy="428" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-software-4`} data-part="terminal-software-4" >
<circle id={`${uid}-terminal-software-4-rim`} cx="1013" cy="443" r="11" fill="#071621" stroke="#73f14c" strokeWidth="6"/>
<circle id={`${uid}-terminal-software-4-light`} cx="1013" cy="443" r="5" fill="#e5ffff"/>
</g>
</g>
<g id={`${uid}-icon-software`} data-part="icon-software" data-center-x="1064" data-center-y="334">
<g id={`${uid}-icon-software-position`} data-part="icon-software-position" transform="translate(1064 334)" stroke="#73f14c" strokeWidth="6">
<circle id={`${uid}-icon-software-boundary`} cx="0" cy="0" r="79" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-icon-software-symbol`} data-part="icon-software-symbol" >
<path id={`${uid}-code-left`} d="M -24 -23 L -49 0 L -24 23" />
<path id={`${uid}-code-right`} d="M 24 -23 L 49 0 L 24 23" />
<path id={`${uid}-code-slash`} d="M 12 -38 L -12 38" />
</g>
</g>
</g>
</g>
<g id={`${uid}-branch-mechanical`} data-part="branch-mechanical" data-color="#10d8fa">
<g id={`${uid}-traces-mechanical`} data-part="traces-mechanical" stroke="#10d8fa" strokeWidth="8">
<path id={`${uid}-trace-mechanical-1`} d="M 419 684 L 334 728 L 289 713 L 240 741" />
<path id={`${uid}-trace-mechanical-2`} d="M 428 704 L 311 763" />
<path id={`${uid}-trace-mechanical-3`} d="M 438 721 L 251 818" />
<path id={`${uid}-trace-mechanical-4`} d="M 451 736 L 324 800" />
<path id={`${uid}-trace-mechanical-5`} d="M 465 752 L 365 799 L 360 828 L 316 852" />
</g>
<g id={`${uid}-terminals-mechanical`} data-part="terminals-mechanical" >
<g id={`${uid}-terminal-mechanical-1`} data-part="terminal-mechanical-1" >
<circle id={`${uid}-terminal-mechanical-1-rim`} cx="240" cy="741" r="11" fill="#071621" stroke="#10d8fa" strokeWidth="6"/>
<circle id={`${uid}-terminal-mechanical-1-light`} cx="240" cy="741" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-mechanical-2`} data-part="terminal-mechanical-2" >
<circle id={`${uid}-terminal-mechanical-2-rim`} cx="311" cy="763" r="11" fill="#071621" stroke="#10d8fa" strokeWidth="6"/>
<circle id={`${uid}-terminal-mechanical-2-light`} cx="311" cy="763" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-mechanical-3`} data-part="terminal-mechanical-3" >
<circle id={`${uid}-terminal-mechanical-3-rim`} cx="324" cy="800" r="11" fill="#071621" stroke="#10d8fa" strokeWidth="6"/>
<circle id={`${uid}-terminal-mechanical-3-light`} cx="324" cy="800" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-mechanical-4`} data-part="terminal-mechanical-4" >
<circle id={`${uid}-terminal-mechanical-4-rim`} cx="316" cy="852" r="11" fill="#071621" stroke="#10d8fa" strokeWidth="6"/>
<circle id={`${uid}-terminal-mechanical-4-light`} cx="316" cy="852" r="5" fill="#e5ffff"/>
</g>
</g>
<g id={`${uid}-icon-mechanical`} data-part="icon-mechanical" data-center-x="185" data-center-y="855">
<g id={`${uid}-icon-mechanical-position`} data-part="icon-mechanical-position" transform="translate(185 855)" stroke="#10d8fa" strokeWidth="6">
<circle id={`${uid}-icon-mechanical-boundary`} cx="0" cy="0" r="78" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-icon-mechanical-symbol`} data-part="icon-mechanical-symbol" >
<path id={`${uid}-gear-teeth`} d="M 41.898,-9.673 L 52.347,-8.291 L 52.347,8.291 L 41.898,9.673 L 36.955,15.307 L 36.466,22.787 L 42.878,31.153 L 31.153,42.878 L 22.787,36.466 L 15.307,36.955 L 9.673,41.898 L 8.291,52.347 L -8.291,52.347 L -9.673,41.898 L -15.307,36.955 L -22.787,36.466 L -31.153,42.878 L -42.878,31.153 L -36.466,22.787 L -36.955,15.307 L -41.898,9.673 L -52.347,8.291 L -52.347,-8.291 L -41.898,-9.673 L -36.955,-15.307 L -36.466,-22.787 L -42.878,-31.153 L -31.153,-42.878 L -22.787,-36.466 L -15.307,-36.955 L -9.673,-41.898 L -8.291,-52.347 L 8.291,-52.347 L 9.673,-41.898 L 15.307,-36.955 L 22.787,-36.466 L 31.153,-42.878 L 42.878,-31.153 L 36.466,-22.787 L 36.955,-15.307 Z" />
<circle id={`${uid}-gear-hub`} cx="0" cy="0" r="19" />
</g>
</g>
</g>
</g>
<g id={`${uid}-branch-communication`} data-part="branch-communication" data-color="#15e4e8">
<g id={`${uid}-traces-communication`} data-part="traces-communication" stroke="#15e4e8" strokeWidth="8">
<path id={`${uid}-trace-communication-1`} d="M 835 684 L 923 729 L 969 713 L 1014 742" />
<path id={`${uid}-trace-communication-2`} d="M 827 704 L 951 766" />
<path id={`${uid}-trace-communication-3`} d="M 817 721 L 1004 819" />
<path id={`${uid}-trace-communication-4`} d="M 804 736 L 921 793" />
<path id={`${uid}-trace-communication-5`} d="M 789 752 L 890 802 L 896 829 L 939 854" />
</g>
<g id={`${uid}-terminals-communication`} data-part="terminals-communication" >
<g id={`${uid}-terminal-communication-1`} data-part="terminal-communication-1" >
<circle id={`${uid}-terminal-communication-1-rim`} cx="1014" cy="742" r="11" fill="#071621" stroke="#15e4e8" strokeWidth="6"/>
<circle id={`${uid}-terminal-communication-1-light`} cx="1014" cy="742" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-communication-2`} data-part="terminal-communication-2" >
<circle id={`${uid}-terminal-communication-2-rim`} cx="951" cy="766" r="11" fill="#071621" stroke="#15e4e8" strokeWidth="6"/>
<circle id={`${uid}-terminal-communication-2-light`} cx="951" cy="766" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-communication-3`} data-part="terminal-communication-3" >
<circle id={`${uid}-terminal-communication-3-rim`} cx="921" cy="793" r="11" fill="#071621" stroke="#15e4e8" strokeWidth="6"/>
<circle id={`${uid}-terminal-communication-3-light`} cx="921" cy="793" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-communication-4`} data-part="terminal-communication-4" >
<circle id={`${uid}-terminal-communication-4-rim`} cx="939" cy="854" r="11" fill="#071621" stroke="#15e4e8" strokeWidth="6"/>
<circle id={`${uid}-terminal-communication-4-light`} cx="939" cy="854" r="5" fill="#e5ffff"/>
</g>
</g>
<g id={`${uid}-icon-communication`} data-part="icon-communication" data-center-x="1069" data-center-y="858">
<g id={`${uid}-icon-communication-position`} data-part="icon-communication-position" transform="translate(1069 858)" stroke="#15e4e8" strokeWidth="6">
<circle id={`${uid}-icon-communication-boundary`} cx="0" cy="0" r="78" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-icon-communication-symbol`} data-part="icon-communication-symbol" >
<circle id={`${uid}-antenna-transmitter`} cx="0" cy="-11" r="9" />
<path id={`${uid}-antenna-tower`} d="M 0 -1 L -24 49 H 24 Z M -15 29 H 15 M -24 49 L 15 29 M 24 49 L -15 29" strokeWidth="5"/>
<path id={`${uid}-antenna-inner-signal`} d="M -18 -34 Q -37 -12 -18 12 M 18 -34 Q 37 -12 18 12" strokeWidth="5"/>
<path id={`${uid}-antenna-outer-signal`} d="M -31 -45 Q -57 -12 -31 23 M 31 -45 Q 57 -12 31 23" strokeWidth="5"/>
</g>
</g>
</g>
</g>
<g id={`${uid}-branch-civil`} data-part="branch-civil" data-color="#23b5ff">
<g id={`${uid}-traces-civil`} data-part="traces-civil" stroke="#23b5ff" strokeWidth="8">
<path id={`${uid}-trace-civil-1`} d="M 589 818 V 918 L 558 950 V 1012" />
<path id={`${uid}-trace-civil-2`} d="M 607 824 V 953" />
<path id={`${uid}-trace-civil-3`} d="M 627 827 V 1038" />
<path id={`${uid}-trace-civil-4`} d="M 647 824 V 974" />
<path id={`${uid}-trace-civil-5`} d="M 665 818 V 921 L 696 953 V 1012" />
</g>
<g id={`${uid}-terminals-civil`} data-part="terminals-civil" >
<g id={`${uid}-terminal-civil-1`} data-part="terminal-civil-1" >
<circle id={`${uid}-terminal-civil-1-rim`} cx="558" cy="1012" r="11" fill="#071621" stroke="#23b5ff" strokeWidth="6"/>
<circle id={`${uid}-terminal-civil-1-light`} cx="558" cy="1012" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-civil-2`} data-part="terminal-civil-2" >
<circle id={`${uid}-terminal-civil-2-rim`} cx="607" cy="953" r="11" fill="#071621" stroke="#23b5ff" strokeWidth="6"/>
<circle id={`${uid}-terminal-civil-2-light`} cx="607" cy="953" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-civil-3`} data-part="terminal-civil-3" >
<circle id={`${uid}-terminal-civil-3-rim`} cx="647" cy="974" r="11" fill="#071621" stroke="#23b5ff" strokeWidth="6"/>
<circle id={`${uid}-terminal-civil-3-light`} cx="647" cy="974" r="5" fill="#e5ffff"/>
</g>
<g id={`${uid}-terminal-civil-4`} data-part="terminal-civil-4" >
<circle id={`${uid}-terminal-civil-4-rim`} cx="696" cy="1012" r="11" fill="#071621" stroke="#23b5ff" strokeWidth="6"/>
<circle id={`${uid}-terminal-civil-4-light`} cx="696" cy="1012" r="5" fill="#e5ffff"/>
</g>
</g>
<g id={`${uid}-icon-civil`} data-part="icon-civil" data-center-x="627" data-center-y="1118">
<g id={`${uid}-icon-civil-position`} data-part="icon-civil-position" transform="translate(627 1118)" stroke="#23b5ff" strokeWidth="6">
<circle id={`${uid}-icon-civil-boundary`} cx="0" cy="0" r="80" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-icon-civil-symbol`} data-part="icon-civil-symbol" >
<path id={`${uid}-bridge-deck`} d="M -53 18 H 53" />
<path id={`${uid}-bridge-towers`} d="M -38 -27 V 40 M 38 -27 V 40" />
<path id={`${uid}-bridge-cable`} d="M -38 -27 Q 0 11 38 -27" strokeWidth="5"/>
<path id={`${uid}-bridge-hanger-1`} d="M -27 -8 V 18" strokeWidth="4"/>
<path id={`${uid}-bridge-hanger-2`} d="M -14 0 V 18" strokeWidth="4"/>
<path id={`${uid}-bridge-hanger-3`} d="M 0 1 V 18" strokeWidth="4"/>
<path id={`${uid}-bridge-hanger-4`} d="M 14 0 V 18" strokeWidth="4"/>
<path id={`${uid}-bridge-hanger-5`} d="M 27 -8 V 18" strokeWidth="4"/>
</g>
</g>
</g>
</g>
</g>
<g id={`${uid}-hub`} data-part="hub" >
<circle id={`${uid}-hub-disc`} cx="627" cy="625" r="208" fill={`url(#${uid}-hub-gradient)`}/>
<circle id={`${uid}-hub-outer-shadow`} cx="627" cy="625" r="205" stroke="#005989" strokeWidth="24" opacity=".7"/>
<circle id={`${uid}-hub-main-rim`} cx="627" cy="625" r="199" stroke={`url(#${uid}-ring-gradient)`} strokeWidth="10" filter={`url(#${uid}-hub-glow)`}/>
<circle id={`${uid}-hub-inner-rim`} cx="627" cy="625" r="189" stroke="#71f4ff" strokeWidth="2" opacity=".85"/>
</g>
<g id={`${uid}-rotating-ring`} data-part="rotating-ring" data-center-x="627" data-center-y="625">
<circle id={`${uid}-ring-dashed-track`} cx="627" cy="625" r="228" stroke="#1ad7ed" strokeWidth="3" strokeDasharray="7 7" opacity=".75"/>
<path id={`${uid}-ring-arrow-arc-1`} d="M 798.316 649.077 A 173 173 0 0 1 639.068 797.579" stroke="#3ce8ff" strokeWidth="3.5" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-ring-arrow-1`} data-part="ring-arrow-1" transform="rotate(86 627 625)">
<path id={`${uid}-ring-arrow-tip-1`} d="M 807 619 L 800 637 L 793 619 L 800 623 Z" fill="#90faff" stroke="none"/>
</g>
<path id={`${uid}-ring-arrow-arc-2`} d="M 520.491 761.326 A 173 173 0 0 1 471.509 549.162" stroke="#3ce8ff" strokeWidth="3.5" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-ring-arrow-2`} data-part="ring-arrow-2" transform="rotate(206 627 625)">
<path id={`${uid}-ring-arrow-tip-2`} d="M 807 619 L 800 637 L 793 619 L 800 623 Z" fill="#90faff" stroke="none"/>
</g>
<path id={`${uid}-ring-arrow-arc-3`} d="M 562.193 464.597 A 173 173 0 0 1 770.424 528.260" stroke="#3ce8ff" strokeWidth="3.5" filter={`url(#${uid}-neon-glow)`}/>
<g id={`${uid}-ring-arrow-3`} data-part="ring-arrow-3" transform="rotate(326 627 625)">
<path id={`${uid}-ring-arrow-tip-3`} d="M 807 619 L 800 637 L 793 619 L 800 623 Z" fill="#90faff" stroke="none"/>
</g>
</g>
<g id={`${uid}-infinity`} data-part="infinity" data-center-x="627" data-center-y="625">
<path id={`${uid}-infinity-outline`} d="M 627 625 C 581 568 551 541 515 568 C 473 600 491 677 538 678 C 573 679 596 650 627 625 C 665 593 696 553 730 568 C 781 590 765 672 720 679 C 684 685 655 655 627 625 Z" stroke="#27b9f2" strokeWidth="39" filter={`url(#${uid}-hub-glow)`}/>
<path id={`${uid}-infinity-ribbon`} d="M 627 625 C 581 568 551 541 515 568 C 473 600 491 677 538 678 C 573 679 596 650 627 625 C 665 593 696 553 730 568 C 781 590 765 672 720 679 C 684 685 655 655 627 625 Z" stroke={`url(#${uid}-infinity-gradient)`} strokeWidth="30"/>
<path id={`${uid}-infinity-highlight`} d="M 627 625 C 581 568 551 541 515 568 C 473 600 491 677 538 678 C 573 679 596 650 627 625 C 665 593 696 553 730 568 C 781 590 765 672 720 679 C 684 685 655 655 627 625 Z" stroke="#c9ffff" strokeWidth="1.8" opacity=".7"/>
</g>
</g>
</svg>
  );
}

import { GrLaunch, GrHome } from "react-icons/gr";
// import {FiUnlock, FiShield} from "react-icons/fi";
import {RiArrowDownSLine, RiArrowUpSLine} from "react-icons/ri"
export const MENUITEMS = [
    {
        title: 'Home',
        path: '/',
        icon: GrHome
    },
    {
        title:'Launchpads',
        icon: GrLaunch,
        iconOpened: RiArrowUpSLine,
        iconClosed: RiArrowDownSLine,
        subNav: [
            {
                title: "Create launchpad",
                path: "/launchpad/create",
            },{
                title: "Create fair launch",
                path: "/fairlaunch/create",
            },{
                title: "Create dutch auction",
                path: "/dutch-auction/create",
            },{
                title: "Create token",
                path: "/launchpad/token/create",
            },{
                title: "Launchpad list",
                path: "/launchpads",
            },
        ]
    }
]
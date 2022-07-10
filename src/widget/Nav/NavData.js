import React from "react";


const NavData = [{
        'name': "Dashboard",
        'isSubmenu': false,
        'link': '/panel',
        "icon": ( < img src = "/assets/svg/dashboard.svg" / > ),
    },
    {
        'name': "Users",
        'isSubmenu': false,
        'link': '/panel/users',
        "icon": ( < img src = "/assets/svg/user.svg" / > ),
        'submenu': [{
            'name': "Add",
            'link': '/panel/product/add',
            "icon": ( < img src = "/assets/svg/plan.svg" / > ),
        }, ]
    },
    {
        'name': "Plans",
        'isSubmenu': false,
        'link': '/panel/plans',
        "icon": ( < img src = "/assets/svg/plan.svg" / > ),
    },
    {
        'name': "Settings",
        'isSubmenu': false,
        'link': '/panel/settings',
        "icon": ( < img src = "/assets/svg/cog.svg" / > ),
    },

]

export default NavData;
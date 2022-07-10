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
        'isSubmenu': true,
        "icon": ( < img src = "/assets/svg/cog.svg" / > ),
        'submenu': [{
                'name': "Username",
                'link': '/panel/settings/username',
                "icon": ( < img src = "/assets/svg/user.svg" / > ),
            },
            {
                'name': "Password",
                'link': '/panel/settings/password',
                "icon": ( < img src = "/assets/svg/key.svg" / > ),
            },
        ]
    },

]

export default NavData;
import React from "react";


const NavData = [
    {
        'name': "Dashboard",
        'isSubmenu': false,
        'link': '/panel',
        "icon": (<img src="/assets/svg/dashboard.svg" />),
    },
    {
        'name': "Users",
        'isSubmenu': false,
        'link': '/panel/users',
        "icon": (<img src="/assets/svg/user.svg" />),
        'submenu': [{
            'name': "Add",
            'link': '/panel/product/add',
            "icon": (<div>icon</div>),

        },]
    },

]

export default NavData;
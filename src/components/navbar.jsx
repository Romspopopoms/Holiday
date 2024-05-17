import React from "react"

const Menu = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/inscriptions",
        name: "Inscriptions",
    },
    {
        path: "/affichage",
        name: "Affichage",
    }
]

const Navbar = () => {
    return (
        <div className="flex flex-col justify-center items-center h-20 bg-slate-300">
            <ul className="flex items-center justify-center">
                {Menu.map((item, index) => (
                    <li key={index} className=" px-4">
                        <a href={item.path} className="text-white hover:text-gray-200">{item.name}</a>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Navbar
import { menu } from "../constants";

const Menu = () => {
  return (
    <div className="h-screen w-52 bg-gray-700 text-left overflow-y-auto">
      <div className="flex flex-col h-full">
        {menu.map((category) => (
          <div key={category.category} className="p-4">
            <h3 className="text-white font-semibold">{category.category}</h3>
            {category.links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-4 py-2 text-white hover:bg-gray-500`}
              >
                {item.name}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;

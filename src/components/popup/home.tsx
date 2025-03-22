import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import HomeSmile from "./components/icons/HomeSmile";

export function PopupHomePage() {
  const handleHomeClick = async () => {
    console.log("clicked");
    //   let result = await sendToBackground({
    //     name: "open-extension"
    //   })
    //   console.log(result)
    // return result;
  };

  return (
    <div className="w-[350px]">
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">Auto</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              isIconOnly
              aria-label="Homepage"
              variant="light"
              onPress={handleHomeClick}
            >
              <HomeSmile />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}

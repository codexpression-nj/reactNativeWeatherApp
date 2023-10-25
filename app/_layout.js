import { Stack } from "expo-router";

export const unstable_settings = {
    // Ensure any route can link back to `/`
    initialRouteName: "home",
  };
  
  const Layout = () => {
    
    return (
      <Stack initialRouteName="home">
        <Stack.Screen name="home" />
       
      </Stack>
    )
  };
  
  export default Layout;
  
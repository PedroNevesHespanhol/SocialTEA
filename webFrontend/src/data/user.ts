// import { axiosInstance } from "@/server/api";
// import { User } from "@/types/user";
// import axios from 'axios';

// let userData = {} as User
// export const fetchUserData = async () => {
//    const slug = sessionStorage.getItem('userSlug');
//    if (!slug) {
//       console.error('No userSlug found in sessionStorage');
//       return null;
//    }
//    try {
//       const response = await axiosInstance(`/user/${slug}`);
//       console.log(response.data);
//       userData = response.data;
//       return response.data;
//    } catch (error) {
//       console.error('Error fetching user data:', error);
//       return null;
//    }
// };


// fetchUserData().then(data => {
//    if (data) {
//       Object.assign(userData, data);
//    }
// });

// export const user: User = {
//    slug: userData.slug,
//    name: userData.name,
//    avatar: userData.avatar
// };

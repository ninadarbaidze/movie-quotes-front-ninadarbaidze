import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';
import { getUserInfo, updateGoogleImage } from 'services';
import { AuthContext, UserContext } from 'store';

export const useFeedWrapper = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const ctx = useContext(AuthContext);
  const userCtx = useContext(UserContext);
  const { data: session } = useSession();

  useEffect(() => {
    const getData = async () => {
      try {
        let response;
        let userId;

        if (session) {
          const token = session.accessToken as string;
          userId = session.userId as string;
          if (!userCtx.userState.profileImage) {
            await updateGoogleImage(
              { profileImage: session!.user!.image as string },
              userId,
              token
            );
          }
          response = await getUserInfo(userId as string, token as string);
          userCtx.getUser(response.data.user);
        } else {
          response = await getUserInfo(ctx.userId, ctx.token);
          userCtx.getUser(response.data.user);
        }
      } catch (err: any) {}
    };
    getData();
  }, [ctx.token, ctx.userId, session]);

  return { mobileMenu, setMobileMenu, ctx, session, userCtx };
};

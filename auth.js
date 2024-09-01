import passport from "passport";
import OutlookStrategy from "passport-outlook";
passport.use(
  new OutlookStrategy(
    {
      clientID: "1199c66e-eefe-483a-b8a2-410592e64d91",
      clientSecret: "kEl8Q~oAGfi8Udzr5J3wEKGVdfx2zGrEAcOBcaBk",
      callbackURL: "http://localhost:3000/auth/outlook/callback",
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      var user = {
        outlookId: profile.id,
        name: profile._json.DisplayName,
        email: profile._json.EmailAddress,
        accessToken: accessToken,
      };
      if (refreshToken) user.refreshToken = refreshToken;
    //   if (profile.MailboxGuid) user.mailboxGuid = profile.MailboxGuid;
    //   if (profile.Alias) user.alias = profile.Alias;
      //   User.findOrCreate(user, function (err, user) {
      done(null, user);
      //   });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(api.Startup))]
namespace api
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

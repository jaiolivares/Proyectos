import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { APP_ROUTES, getBreadcrumbItems } from "../../config/routes";

export default function PageBreadcrumbs() {
  const location = useLocation();
  const crumbs = getBreadcrumbItems(location.pathname);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      {crumbs.length === 0 ? (
        <Typography sx={{ color: "text.primary" }}>{APP_ROUTES.home.label}</Typography>
      ) : (
        [
          {
            label: APP_ROUTES.home.label,
            to: APP_ROUTES.home.path,
            clickable: true,
          },
          ...crumbs.filter((crumb) => crumb.to !== APP_ROUTES.home.path),
        ].map((crumb, index, items) => {
          const isLast = index === items.length - 1;

          if (isLast || !crumb.clickable) {
            return (
              <Typography key={crumb.to} sx={{ color: "text.primary" }}>
                {crumb.label}
              </Typography>
            );
          }

          return (
            <Link key={crumb.to} component={RouterLink} underline="hover" color="inherit" to={crumb.to}>
              {crumb.label}
            </Link>
          );
        })
      )}
    </Breadcrumbs>
  );
}

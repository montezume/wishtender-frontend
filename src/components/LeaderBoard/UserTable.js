import React, { useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Table from "@mui/material/Table";
import { UserContext } from "../../contexts/UserContext";
import Title from "../common/TableTitle";
import UserTableInside from "./UserTableInside";
import UserTableInsideSkeleton from "./UserTableInsideSkeleton";
import UserTableInsideFull from "./UserTableInsideFull";
import Link from "@mui/material/Link";
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
export default function UserTable({
  title,
  users,
  limit,
  link,
  showPercent,
  isLoading,
}) {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const isAdmin = user?.admin;

  return (
    <>
      <Title>{title || "Users"}</Title>
      <Table size="small">
        <UserTableConsumer
          isLoading={isLoading}
          isAdmin={isAdmin}
          users={users}
          limit={limit}
          showPercent={showPercent}
        />
      </Table>
      {link && (
        <div className={classes.seeMore}>
          <Link color="primary" href={link} onClick={() => {}}>
            See more
          </Link>
        </div>
      )}
    </>
  );
}

const UserTableConsumer = ({
  isAdmin,
  isLoading,
  users,
  limit,
  showPercent,
}) => {
  if (isLoading) {
    return <UserTableInsideSkeleton showPercent={!isAdmin} />;
  }
  if (isAdmin) {
    return <UserTableInsideFull users={users} limit={limit} />;
  }

  return (
    <UserTableInside users={users} showPercent={showPercent} limit={limit} />
  );
};

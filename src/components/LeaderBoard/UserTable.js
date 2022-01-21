import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import { UserContext } from "../../contexts/UserContext";
import Title from "../common/TableTitle";
import UserTableInside from "./UserTableInside";
import UserTableInsideFull from "./UserTableInsideFull";
import Link from "@material-ui/core/Link";
const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
export default function UserTable(props) {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const { title } = props;
  const { users } = props;
  const { limit } = props;
  const { link } = props;
  const { showPercent } = props;
  return (
    <>
      <Title>{title || "Users"}</Title>
      <Table size="small">
        {user?.admin ? ( // only show certain table info to admins
          <UserTableInsideFull
            users={users}
            limit={limit}
          ></UserTableInsideFull>
        ) : (
          // show rand and handle to everyone else
          <UserTableInside
            users={users}
            showPercent={showPercent}
            limit={limit}
          ></UserTableInside>
        )}
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

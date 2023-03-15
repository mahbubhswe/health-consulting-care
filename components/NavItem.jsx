import { Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function NavItem({ direction }) {
  const router = useRouter();
  return (
    <Stack direction={direction} spacing={1}>
      <Button
        variant={router.asPath == "/" ? "contained" : null}
        color="yallo"
        disableElevation={true}
        size="small"
      >
        <Link href="/" className="navItem">
          Home
        </Link>
      </Button>
      <Button
        variant={router.asPath == "/tuition-fee" ? "contained" : null}
        color="yallo"
        disableElevation={true}
        size="small"
      >
        <Link href="/tuition-fee" className="navItem">
          Fees
        </Link>
      </Button>
      <Button
        variant={router.asPath == "/noticeboard" ? "contained" : null}
        color="yallo"
        disableElevation={true}
        size="small"
      >
        <Link href="/noticeboard" className="navItem">
          Notice
        </Link>
      </Button>
      <Button
        variant={router.asPath == "/class-routine" ? "contained" : null}
        color="yallo"
        disableElevation={true}
        size="small"
      >
        <Link href="/class-routine" className="navItem">
          Routine
        </Link>
      </Button>
      <Button
        variant={router.asPath == "/result" ? "contained" : null}
        color="yallo"
        disableElevation={true}
        size="small"
      >
        <Link href="/result" className="navItem">
          Result
        </Link>
      </Button>
    </Stack>
  );
}

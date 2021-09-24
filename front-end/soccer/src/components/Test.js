import { Button } from "@mui/material";

export default function TestMyCode() {
        return (
            <div>
              <Button variant="outlined">Nothing</Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
              <Button variant="text" href="#contained-buttons">
                Link
              </Button>
            </div>
        );
}

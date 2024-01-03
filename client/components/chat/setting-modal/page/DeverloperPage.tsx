import { Kbd } from "@hope-ui/solid";
import Settings from "../Settings";

export default function DeveloperPage() {
  return (
    <div>
      <Settings.Title>
        Developer options
      </Settings.Title>
      <Settings.SwitchSetting
        name={<>Press <Kbd>/</Kbd> to show element bound</>}
        description={<>When pressing <Kbd>/</Kbd> it show a red outline of every element in the app</>}
      />
      <Settings.SwitchSetting
        name={<>Welp I can't think what should I put in here</>}
        description={<>plz help me :)</>}
      />
    </div>
  )
}
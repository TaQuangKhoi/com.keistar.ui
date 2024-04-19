import KeistarLayout from "@/components/keistar-ui/keistar-layout";
import KeistarToolbar from "@/components/keistar-ui/keistar-toolbar";
import KeistarLeftSidebar from "@/components/keistar-ui/keistar-left-sidebar";
import OTFragment from "@/app/workspace/office/ot/ot-fragment";

export default function OTPage() {
    return KeistarLayout(
        "OT Registration",
        <KeistarToolbar/>,
        <KeistarLeftSidebar/>,
        <OTFragment/>,
    );
}
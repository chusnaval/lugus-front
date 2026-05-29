import { ResponsivePie } from "@nivo/pie"

export default function FormatPieChart({ stats }: { stats: any }) {
    const data = [
        { id: "DVD", value: stats.dvd, color: "#c0c0c0" },
        { id: "Blu-ray", value: stats.bluray, color: "#3b82f6" },
        { id: "UHD", value: stats.uhd, color: "#c9a86a" },
        { id: "Digital", value: stats.digital, color: "#22c55e" },
        { id: "No Disponible", value: stats.notOwned, color: "#ff4d4d" },
    ]

    return (
        <div style={{ height: "150px" }}>
            <ResponsivePie
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                innerRadius={0.5}
                padAngle={1}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={{ datum: "data.color" }}
                borderWidth={1}
                borderColor="#111"
                enableArcLabels={false}
                enableArcLinkLabels={false}
                theme={{
                    tooltip: { container: { background: "#111", color: "#fff" } },
                }}
            />
        </div>
    )
}

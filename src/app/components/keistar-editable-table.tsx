import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";

export default function KeistarEditableTable(
    {
        title,
        config
    }: {
        title: string,
        config: {
            key: string[],
            head: string[],
            input: string[],
        }
    }
) {
    return <>
        <h3 className="text-lg">
            {title}
        </h3>
        <Table className="border">
            <TableHeader>
                <TableRow>
                    {
                        config.head.map((item, index) => (
                            <TableCell key={index}>
                                {item}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    {
                        config.key.map((item, index) => (
                            <>
                                {
                                    config.input[0] === "#" && (
                                        <TableCell key={index}>
                                            {index + 1}
                                        </TableCell>
                                    )
                                }
                                <TableCell key={index}>
                                    {
                                        config.input[index] === "select" && (
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a person"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">
                                                        John Doe
                                                    </SelectItem>
                                                    <SelectItem value="2">
                                                        Jane Doe
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) ||
                                        (
                                            config.input[index] === "input" && (
                                                <Input placeholder="Enter value"/>
                                            )
                                        )
                                    }
                                </TableCell>
                            </>
                        ))
                    }
                </TableRow>
            </TableBody>
        </Table>
    </>
}
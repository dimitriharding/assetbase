import { DataTable } from "../../../components/DataTable";
import { createColumnHelper } from "@tanstack/react-table";
import {
  TableProps,
  Flex,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { EmptyState, EmptyStateProps, Button } from "@saas-ui/react";
import {
  HiOutlineEllipsisVertical,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";

type IAssets = {
  serialNumber?: string;
  id: string;
  name: string;
  description?: string;
  type?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
};

type IAssetsList = {
  data: IAssets[];
  emptyProps?: EmptyStateProps;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const AssetsList = ({
  data,
  emptyProps,
  onEdit,
  onDelete,
  ...rest
}: IAssetsList & TableProps) => {
  const columnHelper = createColumnHelper<IAssets>();

  const columns = [
    columnHelper.accessor("serialNumber", {
      cell: (info) => info.getValue(),
      header: "#",
    }),
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("description", {
      cell: (info) => info.getValue(),
      header: "Description",
    }),
    columnHelper.accessor("actions", {
      cell: ({ row }) => {
        return (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Actions"
              icon={<HiOutlineEllipsisVertical />}
              variant="ghost"
            />
            <MenuList>
              <MenuItem
                icon={<HiOutlinePencilSquare />}
                onClick={() => onEdit(row.original.id)}
                iconSpacing={1}
              >
                Edit
              </MenuItem>
              <MenuItem
                icon={<HiOutlineTrash />}
                onClick={() => onDelete(row.original.id)}
                color="red.500"
                iconSpacing={1}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        );
      },
      header: "",
    }),
  ];
  if (data.length === 0) {
    return (
      <Flex mt={100}>
        <EmptyState {...emptyProps} />
      </Flex>
    );
  }
  return <DataTable<IAssets> data={data} columns={columns} {...rest} />;
};

export default AssetsList;

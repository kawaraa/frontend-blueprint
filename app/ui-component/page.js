"use client";
import Breadcrumb from "@/ui-library/breadcrumb";
import CheckboxDropList from "@/ui-library/checkbox-drop-list";
import Collapse from "@/ui-library/collapse";
import Dropdown from "@/ui-library/dropdown";
import EmptyState from "@/ui-library/empty-state";
import IosInstallModal from "@/ui-library/ios-install-modal";
import Loader from "@/ui-library/loader";
import Message from "@/ui-library/messages";
import Modal from "@/ui-library/modal";
import ScrollToTopBtn from "@/ui-library/scroll-to-top-btn";
import SearchBox from "@/ui-library/search-box";
import { ShareCopyButton } from "@/ui-library/share-copy-button";
import SvgIcon from "@/ui-library/svg-icon";
import Table, { TableColumnsSelect } from "@/ui-library/table";
import Tabs from "@/ui-library/tabs";
import ToggleSwitch from "@/ui-library/toggle-switch";
import Tooltip from "@/ui-library/tooltip";
import { useRef, useState } from "react";
const itemCls = "relative overflow-auto w-full md:w-1/2 lg:w-1/3 aspect-square p-3";

export default function TextComponent({ params, searchParams }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(dummyData);
  const [x, setX] = useState();

  return (
    <div className="w-full relative flex flex-wrap justify-center items-center">
      <div className={itemCls}>
        <Breadcrumb
          current="path-1"
          items={[
            { path: "path-1", name: "Path 1" },
            { path: "path-2", name: "Path-2" },
            { path: "path-3", name: "Path-2" },
          ]}
        />

        <div className="h-10"></div>

        <SearchBox />

        <div className="h-10"></div>

        <form onChange={(e) => console.log(new FormData(e.target.form).getAll("key[]"))}>
          <CheckboxDropList
            name="key"
            title="some title"
            items={[
              { label: "item-1", key: "item-1" },
              { label: "item-2", key: "item" },
            ]}
          />
        </form>

        <div className="h-10"></div>

        <Tabs tabs={["item=1", "item-2", "item-3"]} current="item-1" />
      </div>
      <div className={itemCls}>
        <TableColumnsSelect
          columns={dataFields}
          selected={Object.keys(data[0] || {})}
          onSelect={(fields) => fetchData(fields).then((res) => setData(res.data))}
        />

        <Table data={data} imgKey="image" onCheck={console.log} onClick={console.log} onSort={console.log}>
          {/* <LoadMoreButton /> */}
        </Table>
      </div>

      <div className={itemCls + " flex justify-center items-center"}>
        <EmptyState />
      </div>

      <div className={itemCls}>
        <Loader loading={true} size="50" />

        <div className="h-10"></div>

        <div className="flex justify-end">
          <Dropdown
            btn="Dropdown"
            items={["Account settings", "Support"]}
            event="click"
            onSelect={console.log}
            // position="right"
          >
            <li className="min-w-64">
              item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1 item 1
            </li>
          </Dropdown>
        </div>

        <div className="h-10"></div>
        <ShareCopyButton text="Some text" cls="m-10" />

        <ToggleSwitch label="Toggle" name="key" />

        <Tooltip>nibcwirb ni vpjwnvp vpwbvpiw vpwjvnpw vpwijvn</Tooltip>

        <Tooltip description="nibcwirb ni vpjwnvp vpwbvpiw vpwjvnpw vpwijvn" />
        <div className="h-10"></div>
      </div>

      <div className={itemCls}>
        <Collapse>
          <p>Some a very very very long paragraph</p>
          <p>Some a very very very long paragraph</p>
          <p>Some a very very very long paragraph</p>
          <p>Some a very very very long paragraph</p>
        </Collapse>
      </div>
      {/* <Message
          messages={[
            { id: "1212", type: "error", text: "Some error message", duration: 6 },
            { id: "2431", type: "warning", text: "Some warning message", duration: 6 },
            { id: "5413", type: "success", text: "Some success message", duration: 6 },
          ]}
          setMessages={() => {}}
        /> */}
      {/* <Modal
          Tag="article"
          lang="en"
          title="Add new user"
          open={true}
          loading={false}
          icon={<SvgIcon name="exclamationMark" />}
          onCancel={() => {}}
          onApprove={() => {}}
          okBtn="Ok"
        ></Modal> */}
      {/* <IosInstallModal lang="en" iconSrc="/apple-touch-icon.png" name="The App Name" /> */}

      {Array(10)
        .fill(null)
        .map(() => (
          <p className="my-20">Some text to make the page longer so the scroll up button show</p>
        ))}
      <ScrollToTopBtn />
    </div>
  );
}

const fetchData = async (fields) => ({
  total: 100,
  data: dummyData.map((item) => {
    const newItem = {};
    fields.forEach((f) => (newItem[f] = item[f]));
    return { ...newItem, id: crypto.randomUUID() };
  }),
});

const dummyStringArray = Array(20).fill("some text");
const dummyData = Array.from({ length: 20 }, () => ({
  id: crypto.randomUUID(),
  image: "some-image.png",
  a: "awefwefwef",
  b: "bdwdwefwef",
  c: "cdwfwefwefw",
  d: "wfwwefwefwefd",
  e: "efwefweewfwefweffw",
  f: "ffwefwefefwefwefw",
  g: "gfwfwefwedwefwef",
}));

const dataFields = Object.keys(dummyData[0]);

const links = [
  {
    id: "parent-1",
    name: "first",
    link: "link///",
    parentId: null,

    children: [],
  },
  {
    id: "parent-2",
    name: "second",
    link: "linnk\\/",
    parentId: null,

    children: [
      {
        id: "child-1",
        name: "first-child",
        link: "link-child\\/",
        parentId: "parent-2",

        children: [],
      },
      {
        id: "child-2",
        name: "second-child",
        link: "link-child\\/",
        parentId: "parent-2",

        children: [
          {
            id: "child-1-2",
            name: "second-child-1",
            link: "link-child\\/",
            parentId: "child-2",

            children: [],
          },
        ],
      },
    ],
  },
];

const findLink = (parentId, links) => {
  for (const node of links) {
    if (node.id === parentId) return node;
    if (node.children) {
      const child = findLink(parentId, node.children);
      if (child) return child;
    }
  }
};

const addChildToParent = (parentId, newChild, links) => {
  const parent = findLink(parentId, links);
  if (parent) {
    parent.children.push(newChild);
  } else {
    console.log("Parent not found.");
  }
};

const newChild = {
  id: "child-3",
  name: "third-child",
  link: "link-child-3\\/",
  parentId: "parent-1",
  children: [],
};

const deleteLink = (parentId, links) => {
    const link = findLink(parentId, links);

    links.filter((link) => link.id !== parentId);
}

let links = [
  {
    id: "group-1",
    parentId: null,
    children: [
      {
        id: "parent-1",
        name: "first",
        link: "link///",
        parentId: "group-1",

        children: [],
      },
    ],
  },
  {
    id: "group-2",
    parentId: null,
    children: [
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
    ],
  },
];

// const findLink = (parentId, links) => {
//   for (const node of links) {
//     if (node.id === parentId) return node;
//     if (node.children) {
//       const child = findLink(parentId, node.children);
//       if (child) return child;
//     }
//   }
// };

const findLink = (idToFind, links) => {
  for (const group of links) {
    // Check if this is the group itself
    if (group.id === idToFind) return group;

    // Check inside the mainLinks of the group
    if (group.children) {
      for (const node of group.children) {
        if (node.id === idToFind) return node;

        // Recursively check inside children
        if (node.children) {
          const child = findLink(idToFind, node.children);
          if (child) return child;
        }
      }
    }
  }
  return null; // Return null if no match found
};

const addChildToParent = (parentId, newChild) => {
  const parent = findLink(parentId, links);
  if (parent) {
    parent.children.push(newChild);
  } else {
    links = [
      ...links,
      {
        parentId: null,
        id: "group-3",
        children: [newChild],
      },
    ];
  }
};

const newChild = {
  id: "child-3",
  name: "third-child",
  link: "link-child-3\\/",
  parentId: "parent-1",
  children: [],
};

addChildToParent('group-1', newChild);
addChildToParent(, newChild);

// const deleteLink = (idToDelete) => {
//   const child = findLink(idToDelete, links);

//   const parent = findLink(child.parentId, links);

//   const ids = parent.children.filter((link) => link.id !== idToDelete);

//   parent.children = ids;
// };

console.log(JSON.stringify(links, null, 2));
// const editLink = (idToEdit, data) => {
//   const child = findLink(idToEdit, links);

//   child.name = data.name;
//   child.link = data.link;
//   console.log(child);
// };

// console.log(editLink("child-2", { name: "nowe", link: "link-nowy" }));

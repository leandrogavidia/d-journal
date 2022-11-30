const DecentralizedJournalArtifact = {
  address: {
    97: "0x642C30B8AEa3F052017Ff3917609F6b26d309780",
  },
  abi: [
    {
      inputs: [
        { internalType: "string", name: "_title", type: "string" },
        { internalType: "string", name: "_content", type: "string" },
      ],
      name: "addNote",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_id", type: "uint256" },
        { internalType: "string", name: "_newContent", type: "string" },
      ],
      name: "changeNoteContent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_id", type: "uint256" },
        { internalType: "string", name: "_newTitle", type: "string" },
      ],
      name: "changeNoteTitle",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "deleteJournal",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getJournal",
      outputs: [
        {
          components: [
            { internalType: "string", name: "title", type: "string" },
            { internalType: "string", name: "content", type: "string" },
            { internalType: "uint256", name: "date", type: "uint256" },
            { internalType: "uint256", name: "id", type: "uint256" },
          ],
          internalType: "struct DecentralizedJournal.note[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_noteId", type: "uint256" }],
      name: "getOneNote",
      outputs: [
        {
          components: [
            { internalType: "string", name: "title", type: "string" },
            { internalType: "string", name: "content", type: "string" },
            { internalType: "uint256", name: "date", type: "uint256" },
            { internalType: "uint256", name: "id", type: "uint256" },
          ],
          internalType: "struct DecentralizedJournal.note",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getTotalNotes",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ],
};

export { DecentralizedJournalArtifact };

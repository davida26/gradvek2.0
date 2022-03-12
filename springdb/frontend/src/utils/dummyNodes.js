const dummyNodes = [
    {
        group: "nodes",
        classes: ["pathway"],
        data: {
            id: "pathway_xyz"
        }
    },
    {
        group: "nodes",
        classes: ["drug"],
        data: {
            id: 'Acetaminophen',
            chembl_code: 'CHEMBL112'
        }
    },
    {
        group: "nodes",
        classes: ["adverse event"],
        data: {
            id: 'Acute hepatic failure',
            meddraCode: '10000804'
        }
    },
    {
        group: "nodes",
        classes: ["adverse event"],
        data: {
            id: 'Toxicity to various agents',
            meddraCode: '10070863'
        }
    },
    {
        group: "nodes",
        classes: ["proteinTarget"],
        data: {
            id: 'Vanilloid receptor',
            parent: "pathway_xyz",
        }
    },
    {
        group: "nodes",
        classes: ["proteinTarget"],
        data: {
            id: 'XYZ receptor',
            parent: "pathway_xyz",
        }
    },
    {
        group: "nodes",
        classes: ["proteinTarget"],
        data: {
            id: 'Cyclooxygenase',
        },

    },
    {
        group: "edges",
        data: {
            id: 'edge_1',
            source: 'Acetaminophen',
            target: 'Acute hepatic failure',
            arrow: "vee",
            critval: 123
        }
    },
    {
        group: "edges",
        data: {
            id: 'edge_2',
            source: 'Acetaminophen',
            target: 'Toxicity to various agents',
            arrow: "vee",
            critval: 123
        }
    },
    {
        group: "edges",
        classes: ["drug_target"],
        data: {
            id: 'edge_3',
            source: 'Acetaminophen',
            target: 'Vanilloid receptor',
            arrow: "vee",
            action: "inhibits",
        }
    },
    {
        group: "edges",
        classes: ["drug_target"],
        data: {
            id: 'edge_4',
            source: 'Acetaminophen',
            target: 'Cyclooxygenase',
            arrow: "vee",
            action: "opener",
        }
    },
];

export {dummyNodes as default};
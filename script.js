const loadIssues=()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res)=>res.json())
    .then((data)=>displayIssues(data))
};



const displayIssues=(issues)=>{
    const actualIssues=issues.data || issues;
    const cardHolder=document.getElementById("card-holder");
    const totalCards=document.getElementById("total-cards");
    totalCards.innerText = actualIssues.length;
    cardHolder.innerHTML="";

    const labelItems={
        "bug": { icon: "fa-solid fa-bug", css: "border-[#FECACA] bg-[#FEECEC] text-[#EF4444]" },
        "help wanted": { icon: "fa-solid fa-life-ring", css: "border-[#FDE68A] bg-[#FFF8DB] text-[#D97706]" },
        "default": { icon: "fa-solid fa-tag", css: "border-[#E4E4E7] bg-[#F4F4F5] text-[#71717A]" }
    };

    const priorityStatus={
        "high":{badge: "bg-[#FEECEC] text-[#EF4444]",border: "border-t-[#00A96E]",img: "./assets/Open-Status.png"},
        "medium":{badge: "bg-[#FFF8DB] text-[#D97706]",border: "border-t-[#00A96E]",img: "./assets/Open-Status.png"},
        "low": {badge: "bg-[#F3E8FF] text-[#A855F7]",border: "border-t-[#A855F7]",img: "./assets/Closed- Status .png"},
        "enhancement": {badge: "bg-[#DEFCE8] text-[#16A34A]",border: "border-t-[#00A96E]",img: "./assets/Open-Status.png"},
        "default": {badge: "bg-gray-100 text-gray-600",border: "border-t-[#00A96E]",img: "./assets/Open-Status.png"}
    };

    for(let issue of actualIssues){
        const cardDiv=document.createElement("div");
        
        const priorityLevel=issue.priority.toLowerCase();
        const newCard=priorityStatus[priorityLevel] || priorityStatus["default"];

        cardDiv.innerHTML=`
            <div class="p-4 bg-white shadow-md rounded-[4px] border-t-4 ${newCard.border}">
                <div class="flex justify-between items-center">
                    <img src="${newCard.img}" alt="Status Icon">
                    <div class="py-[6px] px-[25.5px] ${newCard.badge} rounded-full font-medium text-xs">
                        <p>${issue.priority.toUpperCase()}</p>
                    </div>
                </div>

                <h3 class="text-[#1F2937] font-semibold text-sm mt-3 mb-2">${issue.title}</h3>
                <p class="text-[#64748B] text-xs mb-3 line-clamp-2">${issue.description}</p>

                <div class="flex gap-1 flex-wrap">
                    ${issue.labels.map(label=> {
                        const cardConfig=labelItems[label.toLowerCase()] || labelItems["default"];
                        return `
                        <p class="border rounded-full ${cardConfig.css} font-medium text-center py-[4px] px-[8px] text-[10px] uppercase"><i class="${cardConfig.icon} mr-1"></i> ${label}
                        </p>
                        `;
                    }).join('')}
                </div>

                <hr class="border border-[#E4E4E7] my-4">
                
                <div class="flex justify-between items-center">
                    <span class="text-[10px] text-[#64748B]">#${issue.id} by ${issue.author}</span>
                    <span class="text-[10px] text-[#94A3B8]">${new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        `;
        cardHolder.appendChild(cardDiv);
    }
};
loadIssues();
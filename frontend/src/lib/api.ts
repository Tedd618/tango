const API_BASE = "http://localhost:8000/api";

export interface UserPhoto {
    id: number;
    url: string;
    order: number;
}

export interface PromptTemplate {
    id: number;
    text: string;
    type: string;
    options?: string;
}

export interface UserPrompt {
    id: number;
    answer: string;
    template: PromptTemplate;
}

export interface UserProfile {
    id: number;
    email: string;
    name: string;
    role: string;
    gender?: string;
    location?: string;
    nationality?: string;
    industry?: string;
    salary_min?: number;
    salary_max?: number;
    previous_occupation?: string;
    education?: string;
    resume_url?: string;
    company_name?: string;
    job_title?: string;
    job_description?: string;
    photos: UserPhoto[];
    prompts: UserPrompt[];
    created_at: string;
}

export async function fetchCurrentUser(email: string): Promise<UserProfile | null> {
    const res = await fetch(`${API_BASE}/users/?email=${encodeURIComponent(email)}`);
    if (!res.ok) {
        throw new Error("Failed to fetch user");
    }
    const users = await res.json();
    if (users.length === 0) {
        return null;
    }
    // The list endpoint returns UserResponse, we want UserWithDetails which we can get by calling get_user
    const user = users[0];
    const detailRes = await fetch(`${API_BASE}/users/${user.id}`);
    if (!detailRes.ok) {
        throw new Error("Failed to fetch user details");
    }
    return detailRes.json();
}

export async function updateUser(userId: number, data: Partial<UserProfile>): Promise<UserProfile> {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to update user");
    }
    return res.json();
}

export async function fetchPromptTemplates(role?: string) {
    const url = role ? `http://127.0.0.1:8000/api/prompts/templates?role=${role}` : "http://127.0.0.1:8000/api/prompts/templates";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch prompt templates");
    }
    return response.json();
}

export async function addUserPrompt(userId: number, templateId: number, answer: string) {
    const res = await fetch(`${API_BASE}/users/${userId}/prompts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ template_id: templateId, answer }),
    });
    if (!res.ok) {
        throw new Error("Failed to add prompt");
    }
    return res.json();
}

export async function addUserPhoto(userId: number, url: string, order: number) {
    const res = await fetch(`${API_BASE}/users/${userId}/photos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, order }),
    });
    if (!res.ok) {
        throw new Error("Failed to add photo");
    }
    return res.json();
}

export async function uploadUserPhoto(userId: number, file: File): Promise<UserPhoto> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/users/${userId}/upload-photo`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        throw new Error("Failed to upload photo");
    }
    return res.json();
}

export async function deleteUserPhoto(userId: number, photoId: number) {
    const res = await fetch(`${API_BASE}/users/${userId}/photos/${photoId}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete photo");
    }
}

export async function deleteUserPrompt(userId: number, promptId: number) {
    const res = await fetch(`${API_BASE}/users/${userId}/prompts/${promptId}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("Failed to delete prompt");
    }
}

export interface SwipeResult {
    id: number;
    swiper_id: number;
    target_id: number;
    action: string;
    is_match: boolean;
    created_at: string;
}

export async function fetchCandidates(userId: number): Promise<UserProfile[]> {
    const res = await fetch(`${API_BASE}/matches/${userId}/candidates`);
    if (!res.ok) throw new Error("Failed to fetch candidates");
    return res.json();
}

export async function fetchInbox(userId: number): Promise<UserProfile[]> {
    const res = await fetch(`${API_BASE}/matches/${userId}/inbox`);
    if (!res.ok) throw new Error("Failed to fetch inbox");
    return res.json();
}

export async function swipeUser(
    userId: number,
    targetId: number,
    action: "like" | "pass"
): Promise<SwipeResult> {
    const res = await fetch(`${API_BASE}/matches/${userId}/swipe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_id: targetId, action }),
    });
    if (!res.ok) throw new Error("Failed to swipe");
    return res.json();
}

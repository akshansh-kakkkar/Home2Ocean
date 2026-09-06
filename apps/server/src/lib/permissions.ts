import type { Permission } from "@home2ocean/db";

type PermissionUser = {
	role: "USER" | "REVIEWER" | "ADMIN";
	isOwner: boolean;
	permissions: {
		permission: Permission;
	}[];
};
export function hasPermission(
	user: PermissionUser,
	permission: Permission,
): boolean {
	if (user.role === "ADMIN" && user.isOwner) {
		return true;
	}
	return user.permissions.some(
		(UserPermission) => UserPermission.permission === permission,
	);
}

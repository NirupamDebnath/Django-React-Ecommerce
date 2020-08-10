from rest_framework import permissions

class IsStaffOrReadOnly(permissions.BasePermission):
    """
    Global level permission checks for admin
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # only allow staff to modify objects
        return request.user and (request.user.is_staff == True)
import Visitor from '../../models/creatorModels/visitor.model.js';
class VisitorController {
    async addVisitor(req, res, next) {
        try {
            const { instagramLink } = req.body;
            // Check if the visitor already exists in the database
            const existingVisitor = await Visitor.findOne({ instagramLink });
            let data;
            if (existingVisitor) {
                data = { existingVisitor, isExists: true };
                // If the visitor already exists, redirect them to the login page
                res.status(201).json({
                    success: true,
                    message: 'Visitor already exists',
                    data
                });
            }
            else {
                // If the visitor doesn't exist, create a new visitor record
                const visitor = await Visitor.create({
                    instagramLink,
                    registered: false
                });
                data = { visitor, isExists: false };
                res.status(201).json({
                    success: true,
                    message: 'Visitor added successfully',
                    data
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
    async getNotRegisteredVisitors(req, res, next) {
        try {
            const notRegisteredVisitors = await Visitor.find({ registered: false });
            res.status(200).json({
                success: true,
                message: 'Not registered visitors fetched successfully',
                notRegisteredVisitors
            });
        }
        catch (error) {
            next(error);
        }
    }
}
export default new VisitorController();
//# sourceMappingURL=visitor.controller.js.map